import { Character } from './../../../../shared/interfaces/character.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CharacterService } from 'src/app/shared/services/character.service';
import * as moment from 'moment';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CharacterDetailsComponent implements OnInit {

  character: Character = {id: 0, name: '', image: '', species: '', status: '',type:'', gender: '', origin: {name: '', url: ''}, location: {name: '', url: ''}, episode: [], created: ''};
  dataPolarArea: any;
  dataRadar: any;
  age = '';



  constructor(private activatedRoute: ActivatedRoute, private characterService: CharacterService, private location: Location) { 
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.characterService.getDetails(id).subscribe(data => {this.character = data; this.age = moment(data.created).fromNow()});
    });
  }

  ngOnInit() {
    this.dataPolarArea = {
      datasets: [{
          data: [
              (Math.random()*1600 + 1), 
              (Math.random()*1600 + 1),
              (Math.random()*1600 + 1),
              (Math.random()*1600 + 1),
              (Math.random()*1600 + 1)
          ],
          backgroundColor: [
              "pink",
              "#D73C3C",
              "#0080FF",
              "#6600CC",
              "#606060"
          ],
          label: 'My dataset'
      }],
      labels: [
        "KD",
        "IQ",
        "STR",
        "DEX",
        "STA"
      ]
    };

    this.dataRadar = {
      datasets: [{
        data: [
            (Math.random()*1600 + 1), 
            (Math.random()*1600 + 1),
            (Math.random()*1600 + 1),
            (Math.random()*1600 + 1),
            (Math.random()*1600 + 1)
        ],
        backgroundColor: [
            "#606060"
        ],
        label: 'KD'
    },
    {
      data: [
          (Math.random()*1600 + 1), 
          (Math.random()*1600 + 1),
          (Math.random()*1600 + 1),
          (Math.random()*1600 + 1),
          (Math.random()*1600 + 1)
      ],
      backgroundColor: [

          "#0080FF",
      ],
      label: 'IQ'
  },
  {
    data: [
        (Math.random()*1600 + 1), 
        (Math.random()*1600 + 1),
        (Math.random()*1600 + 1),
        (Math.random()*1600 + 1),
        (Math.random()*1600 + 1)
    ],
    backgroundColor: [
        "#D73C3C",
    ],
    label: 'STR'
},
{
  data: [
      (Math.random()*1600 + 1), 
      (Math.random()*1600 + 1),
      (Math.random()*1600 + 1),
      (Math.random()*1600 + 1),
      (Math.random()*1600 + 1)
  ],
  backgroundColor: [
      "#6600CC",
  ],
  label: 'DEX'
},
{
  data: [
      (Math.random()*1600 + 1), 
      (Math.random()*1600 + 1),
      (Math.random()*1600 + 1),
      (Math.random()*1600 + 1),
      (Math.random()*1600 + 1)
  ],
  backgroundColor: [
      "#FFFFFF",
  ],
  label: 'STA'
}],
      labels: [
        "KD",
        "IQ",
        "STR",
        "DEX",
        "STA"
      ]
    };
  }

  onGoBack() {
    this.location.back();
  }

  test() {
    console.log('nana');
  }
  

}
