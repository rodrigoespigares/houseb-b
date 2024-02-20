window.onload = () => {
    const { createApp } = Vue
        
      createApp({
          data() {
              return {
                  tiempo:"",
                  fecha:"",
                  horaAct:"",
                  articulos: [],
                  copia: "",

                  check:false,

                  index: true,
                  catalogo: false,
                  detalle: false,
              }
          },
          methods:{
              /**
               * Función para cargar las categorias de productos
               */
              apiTiempo(){
                  fetch('https://www.el-tiempo.net/api/json/v2/provincias/18/municipios/18087')
                      .then(
                      res=>{
                          
                          if (!res.ok) {
                              throw new Error('Error en la petición AJAX');
                          }
                          
                          return res.json()})
                      .then(data=>{
                          this.tiempo=data;
                      })
                      .catch(error =>{
                          console.error('Error al hacer la petición AJAX:', error);
                      })
              },
              hora(){
                var timestamp = Date.now();
                var data = new Date(timestamp);
                var horas = data.getHours();
                var minutos = data.getMinutes();

                horas = horas < 10 ? '0' + horas : horas;
                minutos = minutos < 10 ? '0' + minutos : minutos;

                this.horaAct = horas + ':' + minutos
              },
              fetchArticulos(){
                fetch('./assets/json/anuncios.json')
                      .then(
                      res=>{
                          if (!res.ok) {
                              throw new Error('Error en la petición AJAX');
                          }
                          return res.json()})
                      .then(data=>{
                          this.articulos=data.casas;
                          this.copia= this.articulos[0].imagen;
                      })
                      .catch(error =>{
                          console.error('Error al hacer la petición AJAX:', error);
                      })
              },
              inicio(){
                this.catalogo= false;
                this.index= true;
                this.check=false;
                this.detalle=false;
              },
              verCatalogo(){
                this.catalogo= true;
                this.index= false;
                this.check=false;
                this.detalle=false;
              },
              verDetalle(){
                this.catalogo= false;
                this.index= false;
                this.check=false;
                this.detalle=true;
              },
              event(num){
                if(num == "original"){
                    this.articulos[0].imagen = this.copia;
                }else{
                    this.articulos[0].imagen = this.articulos[0].imagenes[num]
                }
              }
          },
          mounted() {
                this.apiTiempo();
                this.fetchArticulos();

                var timestamp = Date.now();

                var data = new Date(timestamp);
                var dia = data.getDate();
                var mes = data.getMonth() + 1; 
                var ano = data.getFullYear();

                this.fecha = dia + '/' + mes + '/' + ano;
                setInterval(this.hora, 1000);

          },
      }).mount('#app')
  }