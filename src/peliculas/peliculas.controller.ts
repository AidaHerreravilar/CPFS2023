import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { Peliculas } from './peliculas';
import { PeliculasService } from './peliculas.service';


@Controller('peliculas')
export class PeliculasController {
constructor (private peliculasService:PeliculasService) {

}

    @Get()
    public getListado(): Peliculas[] {
        return this.peliculasService.getListado();
    }

    @Post()
    create(@Body() peliculas: any): string {
        return this.peliculasService.addPeliculas(peliculas);
    }

    @Get('id')
    public getPeliculaCSV(@Param('id') id): Peliculas {
        return this.peliculasService.getPeliculaCSV(parseInt(id));
    }


    @Delete(':id')
    public deletePelicula(@Param('id') id: number): string {
        return this.peliculasService.deletePelicula(id)
    }

    @Put(':id')
    public reemplazarPelicula(@Body() peliculas: any, @Param('id') id: number): string {
        return this.peliculasService.reemplazarPelicula(id, peliculas)

    }
}

