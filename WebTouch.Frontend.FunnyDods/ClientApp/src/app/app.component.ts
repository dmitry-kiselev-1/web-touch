import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BreedService } from './services/breed.service';
import { Breed } from './models/breed';
import { BaseComponent } from './components/base.component';
import { debug } from 'util';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DogService } from './services/dog.service';
import { Dog } from './models/dog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<Breed[]>;

  constructor(
    private breedService: BreedService,
    private dogService: DogService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
  { super(); }

  public breedList: Array<Breed> = new Array<Breed>();
  public selectedBreed: Breed = new Breed();
  public dog: Dog = {photoPath: "assets/start.jpg"} as Dog;
  private breedParamName = "breed";
  public errorMessage: string = "";

  ngOnInit()
  {
    this.loadBreedList();

    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedBreed.name = params[this.breedParamName];
      if (this.selectedBreed.name)
      {
        //debugger;
        this.reloadPhoto();
      }
    });
  }

  loadBreedList() {
    this.breedService.getList()
      .subscribe(
        response => // success path
        {
          //debugger;
          let body = (response as HttpResponse<object>).body;
          for (let propertyName in body["message"]) {
            this.breedList.push({ name: propertyName } as Breed);

            this.filteredOptions = this.myControl.valueChanges
              .pipe(
                startWith<string | Breed>(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this.filter(name) : this.breedList.slice())
              );
          }
        },
        error => // error path
        {
          console.error(error);
          this.errorMessage = "Oops! Can't read list of breed!";
        }
      );
  }

  reloadPhoto()
  {
    if (!this.selectedBreed.name) return;

    this.dogService.getRandomDogByBreed(this.selectedBreed.name)
      .subscribe(
        response => // success path
        {
          //debugger;
          let body = (response as HttpResponse<object>).body;
          this.dog.photoPath = body["message"];
          this.errorMessage = "";
        },
        error => // error path
        {
          //debugger;
          console.error(error);
          this.errorMessage = `Oops! ${error.error.message}!`;
        }
      );
  }

  filter(name: string): Breed[] {
    return this.breedList.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(breed?: Breed): string | undefined {
    return breed ? breed.name : undefined;
  }

  optionSelected(event: MatAutocompleteSelectedEvent)
  {
    var selectedBreed = event.option.value as Breed;
    this.selectedBreed.name = selectedBreed.name;
    this.router.navigateByUrl (`/?${this.breedParamName}=${this.selectedBreed.name}`);
  }
}
