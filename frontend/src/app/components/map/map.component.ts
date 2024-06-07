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
  @Input() filterUf: string = '';
  @Input() filterSr: number | undefined = undefined;
  @Input() filterIbge: number | undefined = undefined;
  private map!: L.Map;
  private markersLayer: L.LayerGroup = L.layerGroup();

  constructor(private unidadeService: UnidadeService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadUnidades();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['filterRegiao'] && !changes['filterRegiao'].firstChange) ||
      (changes['filterUf'] && !changes['filterUf'].firstChange) ||
      (changes['filterSr'] && !changes['filterSr'].firstChange) ||
      (changes['filterIbge'] && !changes['filterIbge'].firstChange)
    ) {
      this.loadUnidades();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-13.0, -50.0],
      zoom: 4
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
  }

  private loadUnidades(): void {
    const sr = this.filterSr === null ? undefined : this.filterSr;
    const ibge = this.filterIbge === null ? undefined : this.filterIbge;
    if (ibge !== undefined) {
      this.unidadeService.getUnidadesByIbge(ibge).subscribe(
        (unidades: Unidade[]) => {
          this.updateMapMarkers(unidades);
        }
      );
    } else {
      this.unidadeService.getUnidades(this.filterRegiao, sr, this.filterUf).subscribe(
        (unidades: Unidade[]) => {
          this.updateMapMarkers(unidades);
        }
      );
    }
  }

  private updateMapMarkers(unidades: Unidade[]): void {
    this.clearMapMarkers();

    unidades.forEach((unidade: Unidade) => {
      if (unidade.latitude && unidade.longitude && unidade.nomeUnidade && unidade.cidade && unidade.uf) {
        const marker = L.marker([unidade.latitude, unidade.longitude])
          .bindPopup(
            `<b>Unidade: ${unidade.nomeUnidade}</b>
            <br>Região: ${unidade.regiao}
            <br>Cidade: ${unidade.cidade}/${unidade.uf}
            <br>SR de vinculação: ${unidade.nomeSr}`
          )
          
          .bindTooltip(unidade.nomeUnidade, {
            permanent: false,
            direction: 'top'
          });
        this.markersLayer.addLayer(marker);
      }
    });
  }

  private clearMapMarkers(): void {
    this.markersLayer.clearLayers();
  }
}
