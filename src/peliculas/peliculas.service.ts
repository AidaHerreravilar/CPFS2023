import { Injectable } from '@nestjs/common';
import *as fs from 'fs';
import { Peliculas } from './peliculas';

@Injectable()
export class PeliculasService {

    
    public getListado(): Peliculas[] {
        return this.listaPelicula;
    }
    private listaPelicula: Peliculas[] = [];

    constructor() {
        this.cargarPelicula();

    }
    private cargarPelicula(): void {
        let archivo = fs.readFileSync('./src/peliculas/peliculas.csv', 'utf8')
        let datos = archivo.split('\n').map(p => p.replace('\r', '')).map(p => p.split(','));
        this.listaPelicula = [];
        for (let i = 0; i < datos.length; i++) {
            let pelicula = new Peliculas(parseInt(datos[i][0]), datos[i][1], datos[i][2], datos[i][3], datos[i][4], datos[i][5], parseInt(datos[i][6]), datos[i][7]);
            this.listaPelicula.push(pelicula);
        }
    }
    public getPeliculaCSV(id: number): Peliculas {
        let resultado = this.listaPelicula.find(pelicula => pelicula.id == id);
        return resultado
    }
    public addPeliculas(pelicula: any): string {
        let nuevaPelicula = new Peliculas(pelicula.id, pelicula.titulo, pelicula.actores, pelicula.generos, pelicula.sinopsis, pelicula.imagen, pelicula.duracion, pelicula.fecha)
        if (nuevaPelicula.id != null && nuevaPelicula.titulo != null && nuevaPelicula.actores != null && nuevaPelicula.generos != null && nuevaPelicula.sinopsis != null && nuevaPelicula.imagen != null && nuevaPelicula.duracion != null && nuevaPelicula.fecha) {
            this.listaPelicula.push(nuevaPelicula)
            this.cargarCSV(nuevaPelicula)
            return "ok"
        } else {
            return "Parámetro Incorrecto"
        }
    }
    cargarCSV(peliculas: Peliculas): void {
        fs.appendFileSync('./src/peliculas/peliculas.csv', `\n${peliculas.id}, ${peliculas.titulo}, ${peliculas.actores}, ${peliculas.generos}, ${peliculas.sinopsis}, ${peliculas.imagen}, ${peliculas.duracion}, ${peliculas.fecha} $`);
    }

    public deletePelicula(lugar: number): string {
        let respuesta = this.listaPelicula.filter((peliculas) => peliculas.id != lugar,);
        if (respuesta.length != this.listaPelicula.length) {
            this.listaPelicula = respuesta
            this.recargarCSV();
            return "ok"
        } else {
            return 'error 404 not found'
        }

    }
    public recargarCSV() {
        fs.writeFile('./src/peliculas/peliculas.csv', '', function () {
            console.log("recargar")
        });
        this.listaPelicula.forEach((peliculas) => {
            fs.appendFileSync('./src/peliculas/peliculas.csv', `${peliculas.id}, ${peliculas.titulo}, ${peliculas.actores}, ${peliculas.generos}, ${peliculas.sinopsis}, ${peliculas.imagen}, ${peliculas.duracion}, ${peliculas.fecha}`);
        }
        )
    }

    public reemplazarPelicula(id: number, nuevaPelicula: any): string {

        let pelicula = new Peliculas(nuevaPelicula.id, nuevaPelicula.titulo, nuevaPelicula.actores, nuevaPelicula.generos, nuevaPelicula.sinopsis, nuevaPelicula.imagen, nuevaPelicula.duracion, nuevaPelicula.fecha);
        if (pelicula.id != null && pelicula.titulo != null && pelicula.actores != null && pelicula.generos != null && pelicula.sinopsis != null && pelicula.imagen != null && pelicula.duracion != null && pelicula.fecha != null) {
            let index = this.listaPelicula.findIndex((pelicula) => pelicula.id = id);
            if (index != -1) {
                this.listaPelicula[index] = pelicula;
                return 'ok';
            } else {
                return 'error 404';
            }
        } else {
            return 'parametro incorrecto'
        }

    }
}

