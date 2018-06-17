import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BreedService } from './services/breed.service';
import { Breed } from './models/breed';
import { BaseComponent } from './components/base.component';
import { debug } from 'util';
import { MatAutocompleteSelectedEvent } from '@angular/material';

export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<User[]>;

  constructor(private breedService: BreedService) { super(); }

  public breedList: any; //: Breed[] = [];
  public breed: Breed;

  ngOnInit() {

    debugger;
    let breeds = this.breedService.getList()
      .subscribe((data) => {
        debugger;
        this.breedList = data;

        for (let propName in data.message) {
          this.options.push(new User(propName));
        }

        this.myControl.setValue('');

      });
/*
    this.breedService.getList()
      .then(items => {
        this.breedList = items as Breed[];
      })
      .catch(error => {
        this.handleError(error);
      });
*/
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.options.slice())
      );
  }

  filter(name: string): User[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  optionSelected(event: MatAutocompleteSelectedEvent)
  {
    debugger;
    var selected = event.option.value;
  }
}
