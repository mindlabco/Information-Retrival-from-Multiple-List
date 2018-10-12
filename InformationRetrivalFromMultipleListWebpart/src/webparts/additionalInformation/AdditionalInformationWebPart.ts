import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './AdditionalInformationWebPart.module.scss';
import * as strings from 'AdditionalInformationWebPartStrings';
import * as bootstrap from 'bootstrap';

import {  UrlQueryParameterCollection } from '@microsoft/sp-core-library';
require('./app/GeneralForm.css');
//SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');

export interface IHelloWorldWebPartProps {
  description: string;
}

export interface IListItem {
  Title?: string;
  Id: number;
} 

export interface IListfieldItem {

} 
export interface IConfigListItem {
 
} 
   export interface ISPList {  
   
  }
var arrConfig;
var tileList;
var internalfieldList;

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {


  public render(): void {
    this.domElement.innerHTML = 
      `<div class="col-md-12">
	<div class="panel panel-default">    
		<div class="panel-body" id="form">
		  <!--  Details -->
			<div class="form-group" style="margin-bottom:0px;">
				<h2 class="heading">Additional Information</h2>
				<!-- Row 1 -->
				<div class="row addField" >
         
				</div>
				<!-- Row 1 Ends -->
               
			</div>
			<!--  More -->
	</div>
</div>`;

      this.getItem();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  private getItem():void{

         var queryParameters = new UrlQueryParameterCollection(window.location.href);
    let strLocationSearch: string = window.location.search.split("id=")[1];
    console.log(JSON.stringify(strLocationSearch));

     this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Additional%20Information')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: IConfigListItem[] }> => {
        return response.json();
      })
      .then((response: { value: IConfigListItem[] }): void => {
          console.log(response.value);
          arrConfig=response.value;
          this.readItem();
      }, (error: any): void => {
        console.log('Loading all items failed with error: ' + error);
      });
         
  }
  private readItem(): void {
    
  
    var queryParameters = new UrlQueryParameterCollection(window.location.href);
    var strLocationSearch = window.location.search.split("id=")[1];
    console.log(strLocationSearch);
          
     this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('LPTiles')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
        return response.json();
      })
      .then((response: { value: IListItem[] }): void => {
         
        console.log(response);
        tileList=response.value;
        this.getfieldItem();
      }, (error: any): void => {
        console.log('Loading all items failed with error: ' + error);
      });
  }

  private getfieldItem():void{
    var arrCol=[];
    let divhtml: string = '';

    
      arrConfig.forEach(function(element) {
          var temp={'title':element.Title,'Detail':element.Detail};
          arrCol.push(temp);
      });


      arrCol.forEach(function(element) {
            if(element.Detail==true)
            {
              divhtml +=`<div class="controls col-sm-4">
                <input type="tel" id=${element.title} class="floatLabel" name="cell" style="pointer-events: none;">
                <label for="txtTitle" class="active">${element.title}<span style="color:red;">*</span></label>
              </div>`;
            }
        });

          const listContainer: Element = this.domElement.querySelector('.addField');
          listContainer.innerHTML = divhtml;

      debugger;
    var queryParameters = new UrlQueryParameterCollection(window.location.href);
    var tileid = queryParameters.getValue("tileid");

    let strLocationSearch: string = tileid;
    console.log(strLocationSearch);

     this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/Web/Lists/getbytitle('LPTiles')/Fields`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: IListfieldItem[] }> => {
        return response.json();
      })
      .then((response: { value: IListfieldItem[] }): void => {
          console.log(response.value);

        internalfieldList=response.value; 
        
        console.log(internalfieldList); 

         tileList.forEach(function(element) {
           var temp=element;
           console.log(element.title+"--"+internalfieldList);
            if(element.Id==parseInt(strLocationSearch))
            {
             console.log(internalfieldList);
              arrCol.forEach(function(configelement) {
                  if(configelement.Detail==true)
                  {
                 console.log(internalfieldList);
                      internalfieldList.forEach(function(fieldelement) {
                        if(fieldelement.Title==configelement.title)
                        {
                          console.log(fieldelement.EntityPropertyName);
                          var tempval=temp[fieldelement.EntityPropertyName]?temp[fieldelement.EntityPropertyName]:'';
                          (<HTMLInputElement>document.getElementById(configelement.title)).value =tempval;
                        }
                      })
                  }
              });
            }
         });  
         
      }, (error: any): void => {
        console.log('Loading all items failed with error: ' + error);
      });
         
  }
}
