import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { UnidadeService } from '../../services/unidade.service';
import { Unidade } from '../../models/unidade.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() filterRegiao: string = '';
  private map!: L.Map;
  private markersLayer: L.LayerGroup = L.layerGroup();

  constructor(private unidadeService: UnidadeService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadUnidades();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterRegiao'] && !changes['filterRegiao'].firstChange) {
      console.log('Região filtrada mudou:', this.filterRegiao);
      this.loadUnidades();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-15.798461033187, -47.8816857515524],
      zoom: 5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
  }

  private loadUnidades(): void {
    this.unidadeService.getUnidades(this.filterRegiao).subscribe(
      (unidades: Unidade[]) => {
        console.log('Unidades carregadas:', unidades);
        if (unidades && unidades.length > 0) {
          this.updateMapMarkers(unidades);
        } else {
          console.error('Dados inválidos para unidades:', unidades);
        }
      },
      (error) => {
        console.error('Erro ao carregar unidades:', error);
      }
    );
  }

  private updateMapMarkers(unidades: Unidade[]): void {
    this.clearMapMarkers();

    unidades.forEach((unidade: Unidade) => {
      if (unidade.latitude && unidade.longitude && unidade.nomeUnidade && unidade.cidade && unidade.uf) {
        const marker = L.marker([unidade.latitude, unidade.longitude])
          .bindPopup(`<b>${unidade.nomeUnidade}</b><br>${unidade.cidade}, ${unidade.uf}`);
        this.markersLayer.addLayer(marker);
      } else {
        console.error('Unidade inválida:', unidade);
      }
    });
  }

  private clearMapMarkers(): void {
    this.markersLayer.clearLayers();
  }
}
