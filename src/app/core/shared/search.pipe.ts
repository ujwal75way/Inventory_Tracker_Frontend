import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    standalone: true
})
export class SearchPipe implements PipeTransform {
    transform<T>(items: T[], searchTerm: string, fields: (keyof T)[]): T[] {
        if (!items || !searchTerm || searchTerm.trim() === '') {
            return items;
        }

        const term = searchTerm.toLowerCase().trim();

        return items.filter(item => {
            return fields.some(field => {
                const value = item[field];
                if (value === null || value === undefined) {
                    return false;
                }
                return String(value).toLowerCase().includes(term);
            });
        });
    }
}
