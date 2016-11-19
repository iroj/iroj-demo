import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {
       constructor( public storage: Storage) {     
    }

    getData(item) {
        console.log(item);
        return this.storage.get(item);
    }
    save(item, data) {
        let newData = JSON.stringify(data);
        this.storage.set(item, newData);
    }
    remove(item) {
        this.storage.remove(item);
    }

    }
