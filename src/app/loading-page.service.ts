import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingPageService {
  loading: boolean = false;
  loadingComponents: Array<number> = [];

  constructor() { }

  getLoading() {
    return this.loading;
  }

  /**
  * Actualizar el estado de la carga.
  * @param    {boolean} loading    Name of the user
  */

  setLoading(loading: boolean) {

    if (loading === true) {

      // Cuando algun componente indica que empezo a cargarse.

      /* Se agrega un item a loadingComponents para indicar 
      la cantidad de componentes que se estan cargando. */

      this.loadingComponents.push(this.loadingComponents.length + 1);

      setTimeout(() => {
          this.loading = true;
      });

    } else if(loading === false) {

      // Cuando algun componente indica que termino de cargarse.

      /* Se elimina un item de loadingComponents para indicar que uno de 
      los componentes que se estaban cargando ya termino de cargarse. */

      this.loadingComponents.pop();

      /* Si ya no hay ningun componente cargandose se 
        desactiva la barra de carga */

      if (this.loadingComponents.length === 0) {
        setTimeout(() => {
          this.loading = false;
        });
      }

    }
  }
}
