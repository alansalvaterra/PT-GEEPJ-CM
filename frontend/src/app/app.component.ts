import { Component, OnInit } from '@angular/core';
import { RegiaoService } from './services/regiao.service';
import { SrService } from './services/sr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regioes: any[] = [];
  srs: any[] = [];
  selectedRegiao: string = '';
  selectedSr: number | undefined = undefined; // Modificado para aceitar undefined

  constructor(private regiaoService: RegiaoService, private srService: SrService) {}

  ngOnInit(): void {
    this.loadRegioes();
    this.loadSrs();
  }

  loadAllUnidades(): void {
    this.selectedRegiao = '';
    this.selectedSr = undefined; // Modificado para aceitar undefined
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

  onRegiaoChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRegiao = selectElement.value;
    this.selectedSr = undefined;  // Resetar o filtro de SR quando a região for alterada
    console.log('Nova região selecionada:', this.selectedRegiao);
  }

  onSrChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const srString = selectElement.value;
    const srMatch = srString.match(/\d+/); // Extrair o número da SR do nome
    if (srMatch) {
      this.selectedSr = Number(srMatch[0]);
    } else {
      this.selectedSr = undefined;
    }
    this.selectedRegiao = '';  // Resetar o filtro de região quando a SR for alterada
    console.log('Nova SR selecionada:', this.selectedSr);
  }
}
