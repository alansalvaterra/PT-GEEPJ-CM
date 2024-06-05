import { Component, OnInit } from '@angular/core';
import { RegiaoService } from './services/regiao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regioes: any[] = [];
  selectedRegiao: string = '';

  constructor(private regiaoService: RegiaoService) {}

  ngOnInit(): void {
    this.loadRegioes();
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

  onRegiaoChange(event: any): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRegiao = selectElement.value;
    console.log('Nova região selecionada:', this.selectedRegiao); // Adicione este log
  }
  

  loadAllUnidades(): void {
    this.selectedRegiao = '';
  }
}
