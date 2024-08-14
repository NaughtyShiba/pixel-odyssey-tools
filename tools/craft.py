import sys
from typing import Dict
sys.path.append("tools")

from utils.types import Items


def calculate_total_craft_requirements(items: Items, item_name: str, amount = 1) -> Dict[str, int]:
  item = items.get(item_name)
  if item is None:
    raise Exception(f"{item_name} does not exist?")
  if "craft" not in item or item["craft"] is None:
    raise Exception(f"{item_name} is not craftable")

  total_requirements = {}
  for [material_name, craft_amount] in item["craft"].items():
    if material_name not in items:
      raise Exception(f"{material_name} item does not exist")
    material = items[material_name]
    if "craft" in material:
      total_requirements = {
        **total_requirements,
        **calculate_total_craft_requirements(items, material_name, craft_amount * amount)
      }
    else:
      total_requirements[material_name] = craft_amount * amount

  return total_requirements
