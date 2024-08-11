# Pixel Odyssey Tools

## Setup

### Conda
1. Make sure that Conda is up to date
```sh
conda update conda --all
conda update anaconda
```

2. Setup env
```sh
conda create --name pixel_odyssey_tools python=3.12
```

3. Run env
```sh
conda activate pixel_odyssey_tools
```

## Usage
```sh
python tools/refine_cheapest_path.py --name=<item_name>
```
eg.
```sh
python tools/refine_cheapest_path.py --name=silver_pickaxe
```
