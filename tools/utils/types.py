from typing import Literal, Dict, TypedDict, Optional

Stat = Literal[
  "air_damage",
  "air_defense",
  "attack",
  "defense",
  "earth_damage",
  "earth_defense",
  "fire_damage",
  "fire_defense",
  "health",
  "luck",
  "mana",
  "mana_regen",
  "speed",
  "water_damage",
  "water_defense",
  "crit_chance",
  "crit_damage",
  "mining",
  "berry",
  "mush",
]

Stats = Dict[Stat, int]


class StatRecord(TypedDict):
  level: int
  perfect: bool
  items_required: int
  stats: Stats


class PStatRecord(StatRecord):
  cheapest_item: Optional[StatRecord]


NumbersPerLevel = Dict[int, StatRecord]
NumbersPerPerfectLevel = Dict[int, PStatRecord]

RefineBonus = Dict[Stat, float]


class Item(TypedDict):
  type: str
  label: str
  stats: Optional[Stats]
  craft: Optional[Dict[str, int]]

Items = Dict[str, Item]
