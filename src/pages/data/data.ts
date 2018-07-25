import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-data',
  templateUrl: 'data.html'
})
export class DataPage {
  item1:string;
  item2:string;
  item3:string;
  items:string[] = [];
  temp:any[];

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.item1 = "preOne";
    this.item2 = "preTwo";
    this.item3 = "preThree";

    this.getData();

  }

  getData():void {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("CREATE TABLE IF NOT EXISTS chemicals(rowid INTEGER PRIMARY KEY, scenario TEXT, sample INT)", this.temp)
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql("SELECT * FROM chemicals", this.temp)
        .then(res => {
          this.items = [];
          for(var i =0; i<res.rows.length; i++) {
            this.items.push(res.rows.item(i).scenario);
          }
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));

  }

  saveData(id:number, scenario:string, sample:number):void {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
      db.executeSql('INSERT INTO chemicals VALUES(?,?,?)',[id,scenario,sample])
      .then(res => {
        console.log(res);
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));

  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM expense WHERE rowid=?',[rowid])
      .then(res => {
        console.log(res);
      }).catch(e => console.log(e));
    }).catch (e => console.log(e));

  }



  goButton1(): void {
    //this.item1 = "postOne";
    this.saveData(1,"test1",111);
    this.getData();
    this.item1 = this.items[0];
  }
  goButton2(): void {
    this.item2 = "postTwo";
    this.saveData(2,"test2",222);
    this.getData();
    this.item2 = this.items[0];
  }
  goButton3(): void {
    this.item3 = "postThree";
    this.saveData(3,"test3",333);
    this.getData();
    this.item3 = this.items[0];
  }

}
