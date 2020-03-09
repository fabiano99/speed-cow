# API SpeedCow

## Requisitos

* NodeJS
* Typescript

## Execução
Executar dentro do diretório
```bash
$ npm i
$ tsc
$ node ./dist/main.js
```


## End-points
 #### GET
* /affiliates <br>
Retorna todas as filiais cadastradas

* /affiliates/id <br>
Retorna uma filial a partir do identificador ObjectId

* /breeds <br>
Retorna todas as raças cadastradas

* /breeds/id <br>
Retorna uma raça a partir do identificador ObjectId

* /cows <br>
Retorna todas as vacas cadastradas

* /cows/id <br>
Retorna uma vaca a partir do identificador ObjectId

* /cows/affiliate/id <br>
Retorna todas as vacas associadas a uma filial

* /cows/breed/id <br>
Retorna todas as vacas associadas a uma raça

* /cows/search <br>
Retorna todas as vacas a partir doatributo name da filial <b> OU </b> a partir do atributo internalCode da vaca 

#### POST
* /affiliates <br>
Insere uma nova filial na coleção. 
Estrutura do body: `{name: string}`

* /breeds <br>
Insere uma nova raça na coleção. 
Estrutura do body: `{name: string}`

* /cows <br>
Insere uma nova vaca na coleção. 
Estrutura do body:
```
{
  internalCode: string, 
  affiliate: mongoose.Types.ObjectId, 
  breed: mongoose.Types.ObjectId, 
  birthDate: Date
}
```
  
#### PUT
  * /affiliates/id <br>
SUbstitui uma filial na coleção a partir do identificador ObjectId.
Estrutura do body: `{name: string}`

* /breeds/id <br>
SUbstitui uma raça na coleção a partir do identificador ObjectId.
Estrutura do body: `{name: string}`

* /cows/id <br>
SUbstitui uma vaca na coleção a partir do identificador ObjectId.
Estrutura do body:
```
{
  internalCode: string, 
  affiliate: mongoose.Types.ObjectId, 
  breed: mongoose.Types.ObjectId, 
  birthDate: Date
}
```
  
#### PATCH
* /affiliates/id <br>
Atualiza uma filial na coleção a partir do identificador ObjectId.
Estrutura do body: `{name: string}`

* /breeds/id <br>
Atualiza uma raça na coleção a partir do identificador ObjectId.
Estrutura do body: `{name: string}`

* /cows/id <br>
Atualiza uma vaca na coleção a partir do identificador ObjectId.
Estrutura do body:
```
{
  internalCode: string, 
  affiliate: mongoose.Types.ObjectId, 
  breed: mongoose.Types.ObjectId, 
  birthDate: Date
}
```
 
#### DELETE

* /affiliate/id <br>
Remove uma filial a partir do identificador ObjectId

* /breeds/id <br>
Remove uma raça a partir do identificador ObjectId

* /cows/id <br>
Remove uma vaca a partir do identificador ObjectId



