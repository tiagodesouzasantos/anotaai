import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchValidator } from './interfaces/search.interface';
import { CardlistService } from './services/cardlist.service';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { CardListResponseInterface, typeCards } from './interfaces/cardlist.interface';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public search: string;
  public cardList: CardListResponseInterface[];
  public cardListFilter: CardListResponseInterface[];
  private unsub$ = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly cardListService: CardlistService
  ) {
    this.form = this.fb.group(new SearchValidator())
  }

  ngOnInit(): void {
    this.getCardList();
    this.listenSearch();
  }

  ngOnDestroy(): void {
    this.unsub$.complete();
  }

  public getCardList() {
    this.cardListService.getCardList().pipe(take(1)).subscribe(data => {
      if (data) {
        this.cardList = data;
        this.cardListFilter = data;
      }
    });
  }

  public getTagData(item: CardListResponseInterface, type: string): string {
    const card = typeCards[item?.type];

    if (card) {
      return card[type as keyof typeof card];
    }

    return "";
  }

  public deleteItem(item: CardListResponseInterface) {
    const indexOfItem = this.cardList.findIndex(itemList => {
      return itemList.id === item.id
    });

    this.cardList.splice(indexOfItem, 1);

    this.cardListFilter = [...this.cardList];
    this.form.get('search')?.setValue(null);
  }

  private listenSearch() {
    this.form.get('search')?.valueChanges.pipe(takeUntil(this.unsub$), debounceTime(300)).subscribe(data => {
      this.filterCardList(data);
    });
  }

  public filterCardList(searchTerm: string) {
    if (searchTerm?.trim() !== '') {
      this.cardListFilter = this.cardList.filter(item => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
      });
      return;
    }

    this.cardListFilter = [...this.cardList];
  }
}
