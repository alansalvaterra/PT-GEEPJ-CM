import { Component, OnInit } from '@angular/core';
import { RegiaoService } from './services/regiao.service';
import { SrService } from './services/sr.service';
import { MunicipioService } from './services/municipio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regioes: any[] = [];
  srs: any[] = [];
  municipios: any[] = [];
  selectedRegiao: string = '';
  selectedSr: number | undefined = undefined;
  selectedIbge: number | undefined = undefined; // Novo filtro de município

  constructor(private regiaoService: RegiaoService, private srService: SrService, private municipioService: MunicipioService) {}

  ngOnInit(): void {
    this.loadRegioes();
    this.loadSrs();
    this.loadMunicipios(); // Carregar municípios
  }

  loadAllUnidades(): void {
    this.selectedRegiao = '';
    this.selectedSr = undefined;
    this.selectedIbge = undefined; // Resetar o filtro de município
  }

  loadRegioes(): void {
    this.regiaoService.getRegioes().subscribe(
      (data) => {
        this.regioes = data;
      },
      (error) => {
        console.error('Erro ao carregar regiões:', error);
      }
    );
  }

  loadSrs(): void {
    this.srService.getSrs().subscribe(
      (data) => {
        this.srs = data;
      },
      (error) => {
        console.error('Erro ao carregar SRs:', error);
      }
    );
  }

  loadMunicipios(): void {
    this.municipioService.getMunicipios().subscribe(
      (data) => {
        this.municipios = data.rows;
      },
      (error) => {
        console.error('Erro ao carregar municípios:', error);
      }
    );
  }

  onRegiaoChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRegiao = selectElement.value;
    this.selectedSr = undefined;
    this.selectedIbge = undefined;
    console.log('Nova região selecionada:', this.selectedRegiao);
  }

  onSrChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const srString = selectElement.value;
    const srMatch = srString.match(/\d+/);
    if (srMatch) {
      this.selectedSr = Number(srMatch[0]);
    } else {
      this.selectedSr = undefined;
    }
    this.selectedRegiao = '';
    this.selectedIbge = undefined;
    console.log('Nova SR selecionada:', this.selectedSr);
  }

  onIbgeChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedIbge = Number(selectElement.value);
    this.selectedRegiao = '';
    this.selectedSr = undefined;
    console.log('Novo município selecionado:', this.selectedIbge);
  }
}
