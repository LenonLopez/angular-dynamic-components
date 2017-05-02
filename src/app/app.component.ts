import { Square } from './models/square.interface';
import { DynamoService } from './services/dynamo.service';
import { SquareComponent } from './square/square.component';
import { ComponentRef, Component,AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

interface SquareComponentDict {
 [id: number]: ComponentRef<SquareComponent>;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit{
  
  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
  private squareCompFactory = this.resolver.resolveComponentFactory(SquareComponent);
  private squareDict: SquareComponentDict ={};
  
  public title = 'Dynamic Components';
  
  constructor(private resolver: ComponentFactoryResolver
            , private service:DynamoService){}
 
  ngAfterContentInit(){

  this.service.getSquares()
              .subscribe((data:Square[])=> {

                data.forEach(square=>{

                  this.createComponent(square);

                });

              });
  }

  onSquareEmit(event){
    console.log("FROM APP COMPONENT:",event);
    //this.service.updateSquare(event);
  }

  deleteSquare(id){
    let squareId = id.value;
    if(this.squareDict[squareId]){
      this.squareDict[squareId].destroy();
      delete this.squareDict[squareId];
    }
  }

  createSquare(id, name){
    let squareId = id.value;
    let squareName = name.value;
    let configObj ={
      position: {top:"500px","left":"500px"},
      id: squareId,
      name: squareName
    }

    if(squareId !== '' && squareName !== ''){
        this.createComponent(configObj);
    }
  }

  createComponent(configObj){

    let dynamicSquare = this.entry.createComponent(this.squareCompFactory);
      dynamicSquare.instance.config = configObj;
      dynamicSquare.instance.updateConfig.subscribe(this.onSquareEmit);
      this.squareDict[configObj.id] = dynamicSquare;
    }

}

