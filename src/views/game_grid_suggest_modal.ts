import { App, SuggestModal } from 'obsidian';
import { GameGrid } from '@apis/steamgriddb_api';

export class GameGridSuggestModal extends SuggestModal<GameGrid> {
  constructor(
    app: App,
    private readonly suggestion: GameGrid[],
    private onChoose: (error: Error | null, result?: GameGrid) => void,
  ) {
    super(app);
  }

  // Returns all available suggestions.
  getSuggestions(_query: string): GameGrid[] {
    return this.suggestion;
  }

  // Renders each suggestion item.
  renderSuggestion(game: GameGrid, el: HTMLElement) {
    const title = `By ${game.author.name}`;
    el.createEl('div', { text: title });
    el.createEl('img', { attr: { src: game.thumb } });
  }

  // Perform action on the selected suggestion.
  async onChooseSuggestion(game: GameGrid) {
    this.onChoose(null, game);
  }
}
