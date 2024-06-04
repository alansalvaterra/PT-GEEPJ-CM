import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { UnidadeService } from '../../services/unidade.service';
import { Unidade } from '../../models/unidade.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  constructor(private unidadeService: UnidadeService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadUnidades();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-15.798461033187, -47.8816857515524],
      zoom: 5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private loadUnidades(): void {
    this.unidadeService.getUnidades().subscribe(
      (unidades: any[]) => {
        if (Array.isArray(unidades)) { // Verifica se unidades é um array
          unidades.forEach((unidade: any) => { // Usando 'any' temporariamente para simplificar
            // Verifique se os campos esperados existem antes de acessá-los
            if (unidade.latitude && unidade.longitude && unidade.nomeUnidade && unidade.cidade && unidade.uf) {
              L.marker([unidade.latitude, unidade.longitude])
                .bindPopup(`<b>${unidade.nomeUnidade}</b><br>${unidade.cidade}, ${unidade.uf}`)
                .addTo(this.map);
            } else {
              console.error('Unidade inválida:', unidade);
            }
          });
        } else {
          console.error('Dados inválidos para unidades:', unidades);
        }
      },
      (error) => {
        console.error('Erro ao carregar unidades:', error);
      }
    );
  }
  
}
