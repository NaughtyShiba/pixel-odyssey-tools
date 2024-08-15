import sys
import os
from typing import Any, Dict, List
import builtins


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


def generate_data_for_items(
  items_json: Any,
  enemies_json: Any,
  locations_json: Any
):
  items = items_json.items()
  for [item_name, item] in items:
    data = {
      "label": item["label"]
    }
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
  write_json({key: {"label": value["label"], "type": value["type"]} for key, value in items_json.items()}, "./apps/helper/data/items.json")

def generate_data_for_locations(
  locations_json: Any
):
  locations = locations_json.items()
  for [location_name, location] in locations:
    write_json(location, f"./apps/helper/data/locations/{location_name}.json")
  write_json({key: { "label": value["label"] } for key, value in locations_json.items()}, "./apps/helper/data/locations.json")

def generate_data_for_enemies(
  enemies_json: Any,
  locations_json: Any
):
  enemies = enemies_json.items()
  for [enemy_name, enemy] in enemies:
    locations = []
    for [location_name, location] in locations_json.items():
      result = next((item for item in location["enemies"] if item == enemy_name), None)
      if result:
        locations.append(location_name)

    if len(locations) > 0:
      enemy["locations"] = locations
    write_json(enemy, f"./apps/helper/data/enemies/{enemy_name}.json")
  write_json({key: { "label": value["name"] } for key, value in enemies_json.items()}, "./apps/helper/data/enemies.json")

def generate_search_map(
  items_json: Any,
  enemies_json: Any,
  locations_json: Any
):
  map = [{
      "id": "items",
      "label": "Items",
      "items": [
      {"id": key, "slug": f"/items/{key}", "label": value["label"], }
        for key, value in items_json.items()
      ],
  },{
      "id": "enemies",
      "label": "Enemies",
      "items": [
      {"id": key,  "slug": f"/enemies/{key}", "label": value["name"], }
        for key, value in enemies_json.items()
      ],
  },{
      "id": "locations",
      "label": "Locations",
      "items": [
      {"id": key,  "slug": f"/locations/{key}", "label": value["label"], }
        for key, value in locations_json.items()
      ],
  }]
  write_json(map, "./apps/helper/data/search_map.json")



def main():
  items_json = load_json("./data/items.json")
  enemies_json = load_json("./data/enemies.json")
  locations_json = load_json("./data/locations.json")
  generate_data_for_items(
    items_json=items_json,
    enemies_json=enemies_json,
    locations_json=locations_json
  )
  generate_data_for_locations(
    locations_json=locations_json
  )
  generate_data_for_enemies(
    enemies_json=enemies_json,
    locations_json=locations_json
  )
  generate_search_map(
    items_json=items_json,
    enemies_json=enemies_json,
    locations_json=locations_json
  )



if __name__ == "__main__":
  main()
