import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {
  previous = 0;
  transform(value: any, page: number ,search: string): any {
    if (search) {
      return value.filter((data: any) => {
        return (
          data.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          data.email.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      });

    }
    else {
      let sliceupto = page * 10;
      if (page == 1) {
        this.previous = 0
      } else {
        this.previous = sliceupto - 10
      }

      return value.slice(this.previous, sliceupto);
    }
  }
}
