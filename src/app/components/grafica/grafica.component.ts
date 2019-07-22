import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {} from 'ng2-charts';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    response: true
  };
  public barChartsLabels: string[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];
  public barChartType = 'bar';
  public barChartData: any[] = [{ data: [0, 0, 0, 0], label: 'Entrevistados' }];

  constructor(private http: HttpClient, public wsService: WebsocketService) {}

  ngOnInit() {
    this.getData();
    this.escucharSocket();
  }

  getData() {
    this.http.get('http://localhost:3000/encuesta').subscribe((data: any) => (this.barChartData = data));
  }

  escucharSocket() {
    this.wsService.listen('change-encuesta').subscribe((data: any) => {
      console.log('socket', data);
      this.barChartData = data;
    });
  }
}
