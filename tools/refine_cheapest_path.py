import sys

sys.path.append("tools")

import argparse
import json
import math
from typing import Optional

from utils.constants import stats_refine_bonus
from utils.types import (
  NumbersPerLevel,
  NumbersPerPerfectLevel,
  StatRecord,
  Stats,
)


def better_for_refine(new_stats: Stats, potential_new_stats: Stats):
  return any(
    val > potential_new_stats.get(stat, 0) for stat, val in new_stats.items()
  )


def calculate_imperfect_refine(stats: Stats):
  numbers_per_level: NumbersPerLevel = {
    1: {
      "level": 1,
      "stats": stats,
      "items_required": 1.0,
      "perfect": False,
    }
  }

  for target_level in range(2, 11):
    previous_level_stats = numbers_per_level[target_level - 1]["stats"]
    current_level_stats = {}
    for stat in previous_level_stats:
      val = previous_level_stats[stat]
      next_val = val + max(
        math.floor(stats[stat] / 100 * stats_refine_bonus[stat]), 2
      )
      current_level_stats[stat] = next_val
    numbers_per_level[target_level] = {
      "level": target_level,
      "items_required": target_level,
      "stats": current_level_stats,
      "perfect": False,
    }

  return numbers_per_level


def calculate_perfect_refine(stats: Stats):
  # Imperfect refine stats
  numbers_per_imperfect_level = calculate_imperfect_refine(stats)
  # Level 1 and 2 stats - they are same as Level 1 and Level 2 imperfect refine, so skip calculation
  numbers_per_pefect_level: NumbersPerPerfectLevel = {
    1: {
      "level": 1,
      "stats": numbers_per_imperfect_level[1]["stats"],
      "items_required": numbers_per_imperfect_level[1]["items_required"],
      "cheapest_item": None,
      "perfect": True,
    },
    2: {
      "level": 2,
      "stats": numbers_per_imperfect_level[2]["stats"],
      "items_required": numbers_per_imperfect_level[2]["items_required"],
      "cheapest_item": numbers_per_imperfect_level[1],
      "perfect": True,
    },
  }

  # Go from 3 to 10 - that's our target level
  for target_level in range(3, 11):
    # Cheapest item with best bonus
    # E.g.
    #   Level 8 Perfect Refine Silver Pickaxe + Level 8 imPerfect Refine Silver Pickaxe = 37 + 4 = 41
    #   Level 8 Perfect Refine Silver Pickaxe + Level 7 Perfect Refine Silver Pickaxe = 37 + 4.125 = 41
    # Because Level 8 imPerfect requires only 8 pickaxe Level 7 Perfect requires 16 pickaxes, we want Level 8 imPerfect
    cheapest_item_to_refine_with: Optional[StatRecord] = None
    # Stats of item, which will be refined to next level. If target_level is 3, target item will have level 2)
    previous_level_stats = numbers_per_pefect_level[target_level - 1]["stats"]
    # Stats kept for comparison
    potential_new_stats = numbers_per_pefect_level[target_level - 2]["stats"]

    # First we go through each imperfect level to figure out which one provides best increase for lowest level
    # e.g. if level 10 and 8 provides same bonus - we want level 8 item
    # However, max level we can sacrifice is same as current items level
    for sacrifice_level in range(1, target_level):
      # print("Targte level", sacrifice_level, " using ", sacrifice_level)
      sacrifice_item = numbers_per_imperfect_level[sacrifice_level]
      # Stats used for comparison to check if item is better
      stats_to_compare: Stats = {}
      # Go through each stat to calculate new value
      for stat in previous_level_stats:
        val = previous_level_stats[stat]
        next_val = val + max(
          # Multiple N level imperfect refine items stat by a bonus and floor it
          math.floor(
            sacrifice_item["stats"][stat] / 100 * stats_refine_bonus[stat]
          ),
          # Fallback to 2 if value line above is 1
          2,
        )
        stats_to_compare[stat] = next_val
      if better_for_refine(stats_to_compare, potential_new_stats):
        potential_new_stats = stats_to_compare
        cheapest_item_to_refine_with = sacrifice_item

    # Now we will calculate using perfect refine
    # However, max level we can sacrifice is same as current items level
    for sacrifice_level in range(1, target_level):
      sacrifice_item = numbers_per_pefect_level[sacrifice_level]
      # Stats used for comparison to check if item is better
      stats_to_compare: Stats = {}
      # Go through each stat to calculate new value
      for stat in previous_level_stats:
        val = previous_level_stats[stat]
        next_val = val + max(
          # Multiple N level imperfect refine items stat by a bonus and floor it
          math.floor(
            sacrifice_item["stats"][stat] / 100 * stats_refine_bonus[stat]
          ),
          # Fallback to 2 if value line above is 1
          2,
        )
        stats_to_compare[stat] = next_val
      if better_for_refine(stats_to_compare, potential_new_stats):
        potential_new_stats = stats_to_compare
        cheapest_item_to_refine_with = sacrifice_item

    if cheapest_item_to_refine_with is not None:
      numbers_per_pefect_level[target_level] = {
        "level": target_level,
        # Stats of next level
        "stats": potential_new_stats,
        # Total Items required
        "items_required": numbers_per_pefect_level[target_level - 1][
          "items_required"
        ]
        + cheapest_item_to_refine_with["items_required"],
        "cheapest_item": cheapest_item_to_refine_with,
        "perfect": True,
      }
  return numbers_per_pefect_level


def load_json(file_path: str):
  with open(file_path, "r") as file:
    data = json.load(file)
  return data


def calculate_and_print(item_name: str):
  itemsJSON = load_json("./data/items.json")

  if item_name is None:
    print("No item name has been passed")
    exit()

  if item_name not in itemsJSON:
    print(f"{item_name} does not exist in items.json")
    exit()

  item = itemsJSON[item_name]
  if "stats" not in item:
    print(f"{item_name} does not have stats")
    exit()

  rows = calculate_perfect_refine(item["stats"])
  items = rows.items()
  for [level, entry] in items:
    if entry["cheapest_item"] is None:
      print(f"Level {entry["level"]} item does not need to be refined, silly!")
    else:
      perfect = "perfect" if entry["cheapest_item"]["perfect"] else "imperfect"
      print(
        f"Level {entry["level"]} requires Level {entry["cheapest_item"]["level"]} {perfect} sacrifice, because: "
      )
      for stat in entry["stats"]:
        print(
          f"  {rows[level -1]["stats"][stat]} {stat} + ({entry["cheapest_item"]["stats"][stat]} {stat} * {stats_refine_bonus[stat]}%) = ({rows[level -1]["stats"][stat]} + {entry["cheapest_item"]["stats"][stat] / 100 * stats_refine_bonus[stat]}) = {entry["stats"][stat]} {stat}"
        )

  print(f"Totals items required: {int(rows[10]["items_required"])}")


def main():
  parser = argparse.ArgumentParser(
    description="""
    Refine Cheapest Path Calculator.
    Usage: python tools/refine_cheapest_path.py --name=silver_pickaxe
  """
  )
  parser.add_argument(
    "--name", type=str, help="Name of item to check refine path of"
  )
  args = parser.parse_args()
  calculate_and_print(args.name)


if __name__ == "__main__":
  main()
