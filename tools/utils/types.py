from typing import Literal, Dict, TypedDict, Optional

Stat = Literal[
  "air_damage",
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

Stats = Dict[Stat, int];
class StatRecord(TypedDict):
  level: int;
  perfect: bool;
  items_required: float
  stats: Stats
class PStatRecord(StatRecord):
  cheapest_item: Optional[StatRecord]
NumbersPerLevel = Dict[int, StatRecord]
NumbersPerPerfectLevel = Dict[int, PStatRecord]

RefineBonus = Dict[Stat, float]
