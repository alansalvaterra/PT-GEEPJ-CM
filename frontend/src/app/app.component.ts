import { Component, OnInit } from '@angular/core';
import { RegiaoService } from './services/regiao.service';
import { SrService } from './services/sr.service';
import { MunicipioService } from './services/municipio.service';
import { UfService } from './services/uf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regioes: any[] = [];
  ufs: any[] = [];
  srs: any[] = [];
  municipios: any[] = [];
  selectedRegiao: string = '';
  selectedUf: string = '';
  selectedSr: number | undefined = undefined;
  selectedIbge: number | undefined = undefined; 

  constructor(
    private regiaoService: RegiaoService, 
    private srService: SrService, 
    private municipioService: MunicipioService, 
    private ufService: UfService
  ) {}

  ngOnInit(): void {
    this.loadRegioes();
    this.loadSrs();
    this.loadMunicipios();
    this.loadUf(); 
  }

  loadAllUnidades(): void {
    this.selectedRegiao = '';
    this.selectedUf = '';
    this.selectedSr = undefined;
    this.selectedIbge = undefined; 
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

  loadUf(): void {
    this.ufService.getUfs().subscribe(
      (data) => {
        this.ufs = data;
      },
      (error) => {
        console.error('Erro ao carregar UF:', error);
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
    this.selectedUf = '';
    this.selectedSr = undefined;
    this.selectedIbge = undefined;
    console.log('Nova região selecionada:', this.selectedRegiao);
  }

  onUfChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedUf = selectElement.value;
    this.selectedRegiao = '';
    this.selectedSr = undefined;
    this.selectedIbge = undefined;
    console.log('Nova UF selecionada:', this.selectedRegiao);
  }

  onSrChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSr = Number(selectElement.value);
    this.selectedRegiao = '';
    this.selectedUf = '';
    this.selectedIbge = undefined;
    console.log('Nova SR selecionada:', this.selectedSr);
  }

  onIbgeChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedIbge = Number(selectElement.value);
    this.selectedRegiao = '';
    this.selectedUf = '';
    this.selectedSr = undefined;
    console.log('Novo município selecionado:', this.selectedIbge);
  }
}
