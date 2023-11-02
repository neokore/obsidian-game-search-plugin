# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.7](https://github.com/CMorooney/obsidian-game-search-plugin/compare/0.1.6...0.1.7) (2023-11-02)

### [0.1.9](https://github.com/CMorooney/obsidian-game-search-plugin/compare/0.1.6...0.1.9) (2023-11-02)

### [0.1.8](https://github.com/CMorooney/obsidian-game-search-plugin/compare/0.1.6...0.1.8) (2023-11-02)

### [0.1.7](https://github.com/CMorooney/obsidian-game-search-plugin/compare/0.1.6...0.1.7) (2023-11-02)

## 0.1.6
fixes broken icon for ribbon button ([Issue 8](https://github.com/CMorooney/obsidian-game-search-plugin/issues/8))

## 0.1.5
adds a button in the settings page to completely regenerate all files in the selected folder. This was mostly done so that folks who were not adding anything to their templates could update their template and regenerate their library ([Issue 6](https://github.com/CMorooney/obsidian-game-search-plugin/issues/6))

## 0.1.4
adds request to Game details endpoint of RAWG api before creating game not or inserting metadata into existing. This was mostly done so that game Publishers and Developers could be used in templating ([Issue 3](https://github.com/CMorooney/obsidian-game-search-plugin/issues/3))

## 0.1.3
puts `editorCallback` back when inserting game metadata into existing note -- _that_ makes sense I just wasn't using that feature as much/ever

## 0.1.2
removes `editorCallback` for action in prefence of `callback` -- I would like to be able to create a game note without being in edit mode

## 0.1.1
Fixes install problem described in 0.1.0

## 0.1.0
Initial release to Obsidian package collection - this version was broken because of a name mis-match between the registered plugin and the actual manifest after making a change to the registration during PR but not the actual plugin
