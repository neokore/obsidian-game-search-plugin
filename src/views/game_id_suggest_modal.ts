import { App, SuggestModal } from 'obsidian';
import { GridGameID } from '@apis/steamgriddb_api';

export class GameIDSuggestModal extends SuggestModal<GridGameID> {
  constructor(
    app: App,
    private readonly suggestion: GridGameID[],
    private onChoose: (error: Error | null, result?: GridGameID) => void,
  ) {
    super(app);
    console.log('GAME', 'Creating suggest modal');
  }

  // Returns all available suggestions.
  getSuggestions(_query: string): GridGameID[] {
    console.log('GAME', 'Get suggestions...', this.suggestion);
    return this.suggestion;
  }

  // Renders each suggestion item.
  renderSuggestion(game: GridGameID, el: HTMLElement) {
    console.log('GAME', 'Render suggestion', game);
    const title = game.name;
    el.createEl('div', { text: title });
  }

  // Perform action on the selected suggestion.
  async onChooseSuggestion(game: GridGameID) {
    console.log('GAME', 'Choose suggestion', game);
    this.onChoose(null, game);
  }
}
