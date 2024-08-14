import sys
import os
from typing import Any, Dict, List


sys.path.append("tools")

import json

from refine_cheapest_path import calculate_imperfect_refine, calculate_perfect_refine
from craft import calculate_total_craft_requirements

def write_json(data: Dict[Any, Any] | List[Any], path: str):
  os.makedirs(os.path.dirname(path), exist_ok=True)
  with open(path, "w") as file:
    file.write(json.dumps(data, indent=2))

def load_json(file_path: str):
  with open(file_path, "r") as file:
    data = json.load(file)
  return data


def item_imperfect_refine(item: Any):
  data = {}
  rows = calculate_imperfect_refine(item["stats"])
  for [level, entry] in rows.items():
    data[level] = {
      "total_items": level,
      "stats": entry["stats"]
    }
  return data

def item_perfect_refine(item: Any):
  data = {}
  rows = calculate_perfect_refine(item["stats"])
  for [level, entry] in rows.items():
   if "cheapest_item" in entry and entry["cheapest_item"] is not None:
      data[level] = {
        "refine_with": { "perfect": entry["cheapest_item"]["perfect"], "level": entry["cheapest_item"]["level"] },
        "total_items": entry["items_required"],
        "stats": entry["stats"]
      }
   else:
     data[level] = {
       "total_items": 1,
       "stats": entry["stats"]
     }
  return data


def main():
 items_json = load_json("./data/items.json")
 enemies_json = load_json("./data/enemies.json")
 locations_json = load_json("./data/locations.json")
 items = items_json.items()
 for [item_name, item] in items:
  data = {}
  if "stats" in item:
    data["perfect_refine"] = item_perfect_refine(item)
    data["imperfect_refine"] = item_imperfect_refine(item)

  if "craft" in item:
    data["craft"] = item["craft"]
    data["total_craft"] = calculate_total_craft_requirements(items_json, item_name)

  enemy_drop = {}
  for [enemy_name, enemy] in enemies_json.items():
    result = next((item for item in enemy["drops"] if item["item"] == item_name), None)
    if result:
      enemy_drop[enemy_name] = result["chance"]

  if len(enemy_drop) > 0:
    data["enemy_drop"] = enemy_drop


  stepping_drop = []
  for [location_name, location] in locations_json.items():
    result = next((item for item in location["items"] if item == item_name), None)
    if result:
      stepping_drop.append(location_name)

  if len(stepping_drop) > 0:
    data["stepping_drop"] = stepping_drop


  write_json(data, f"./apps/helper/data/items/{item_name}.json")
  write_json(list(items_json.keys()), "./apps/helper/data/items.json")



if __name__ == "__main__":
  main()
