import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService<T> {

  constructor() { }

  getItem(itemName: string): T[] {
    let storageValue = localStorage.getItem(itemName) ?? ''
    if(storageValue.length) return JSON.parse(storageValue)
    return []
  }

  setItem(name: string, item: T[]){
    localStorage.setItem(name, JSON.stringify(item))
  }
}
