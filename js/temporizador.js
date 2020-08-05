function criarElemento(elemento, classe, html){
    let e = document.createElement(elemento)
    e.classList.add(classe)
    e.innerHTML = html
    return e
}

function Cronometro() {
   
    this.segundosUnidade = 0
    this.segundosDezena = 0
    this.minutosUnidade = 0
    this.minutosDezena = 0
    this.horaUnidade = 0
    this.horaDezena = 0
    this.interval = null
    this.status = "stopped"
     

    this.timeCount = () => {
        const digitos = document.querySelectorAll('.temporizadorConteiner .temporizador .digito')
        if(this.segundosUnidade < 9){
        
            digitos[5].innerHTML = `${++this.segundosUnidade}`
    
        } else if (this.segundosDezena < 5){
        
            this.segundosUnidade = 0
            digitos[4].innerHTML = `${++this.segundosDezena}`
            digitos[5].innerHTML = `${this.segundosUnidade}`
    
        } else if (this.minutosUnidade < 9) {
    
            this.segundosUnidade = 0
            this.segundosDezena = 0
            digitos[3].innerHTML = `${++this.minutosUnidade}`
            digitos[4].innerHTML = `${this.segundosDezena}`
            digitos[5].innerHTML = `${this.segundosUnidade}`
    
        } else if (this.minutosDezena < 5){
    
            this.segundosUnidade = 0
            this.segundosDezena = 0
            this.minutosUnidade = 0
            digitos[2].innerHTML = `${++this.minutosDezena}`
            digitos[3].innerHTML = `${this.minutosUnidade}`
            digitos[4].innerHTML = `${this.segundosDezena}`
            digitos[5].innerHTML = `${this.segundosUnidade}`
    
        } else if (this.horaUnidade < 9){
    
            this.segundosUnidade = 0
            this.segundosDezena = 0
            this.minutosUnidade = 0
            this.minutosDezena = 0
            digitos[1].innerHTML = `${++this.horaUnidade}`
            digitos[2].innerHTML = `${this.minutosDezena}`
            digitos[3].innerHTML = `${this.minutosUnidade}`
            digitos[4].innerHTML = `${this.segundosDezena}`
            digitos[5].innerHTML = `${this.segundosUnidade}`
    
        } else if (this.horaDezena < 9){
    
            this.segundosUnidade = 0
            this.segundosDezena = 0
            this.minutosUnidade = 0
            this.minutosDezena = 0
            this.horaUnidade = 0
            digitos[0].innerHTML = `${++this.horaDezena}`
            digitos[1].innerHTML = `${this.horaUnidade}`
            digitos[2].innerHTML = `${this.minutosDezena}`
            digitos[3].innerHTML = `${this.minutosUnidade}`
            digitos[4].innerHTML = `${this.segundosDezena}`
            digitos[5].innerHTML = `${this.segundosUnidade}`
    
        }
    }

    this.init = () => {
        
        let tempConteiner = criarElemento('div', 'temporizadorConteiner', "")
        let temporizador = criarElemento('div', 'temporizador', "") 

        tempConteiner.appendChild(temporizador)
        document.body.appendChild(tempConteiner)

        temporizador.appendChild(criarElemento('span', 'digito', '0'))
        temporizador.appendChild(criarElemento('span', 'digito', '0'))
        temporizador.appendChild(criarElemento('span', 'separador', ':'))
        temporizador.appendChild(criarElemento('span', 'digito', '0'))
        temporizador.appendChild(criarElemento('span', 'digito', '0'))
        temporizador.appendChild(criarElemento('span', 'separador', ':'))
        temporizador.appendChild(criarElemento('span', 'digito', '0'))
        temporizador.appendChild(criarElemento('span', 'digito','0')) 
        
        let botoes = criarElemento('div', 'botoes', "")
        tempConteiner.appendChild(botoes)
        botoes.appendChild(criarElemento('button', 'botao', 'PLAY'))
        botoes.appendChild(criarElemento('button', 'botao', 'RESET'))   
        
        let botaoStartStop = document.querySelectorAll('.botao')[0]
        let botaoReset = document.querySelectorAll('.botao')[1]

        botaoStartStop.onclick = this.start
        botaoReset.onclick = this.reset

        
    }
    
    this.start = () => {
        const btnStart = document.querySelectorAll('.temporizadorConteiner .botao')[0]
        if(this.status === "stopped"){
            this.interval = window.setInterval(this.timeCount, 1000)   
            this.status = "started"
            if(btnStart){
                btnStart.innerHTML = "STOP"      
            }
        } else if (this.status === "started") {
            window.clearInterval(this.interval)
            this.status = "stopped" 
            if(btnStart){
                btnStart.innerHTML = "START"  
            }
        }           
    }

    this.reset = () => {
        window.clearInterval(this.interval)
        const botaoStartStop = document.querySelectorAll('.botao')[0]
        const digitos = document.querySelectorAll('.temporizadorConteiner .temporizador .digito')
        digitos.forEach(digito => {
            digito.innerHTML = "0"
        })
    
        this.segundosUnidade = 0
        this.segundosDezena = 0
        this.minutosUnidade = 0
        this.minutosDezena = 0
        this.horaUnidade = 0
        this.horaDezena = 0
    
        botaoStartStop.innerHTML = "START"
        this.status = "stopped"
    }
    
    this.controle = comando => {
        if (comando == 'start'){
            this.interval = window.setInterval(this.timeCount, 1000)
        }  else if (comando == 'stop') {
            window.clearInterval(this.interval)
        } else if (comando == 'reset') {
            this.reset()
        }
    }

    this.config = args => {
        if (args.botoes == false){
            $('.temporizadorConteiner .botoes').hide()
        } else if (args.botoes == true) {
            $('.temporizadorConteiner .botoes').show()
        }

        const cssControle = (component, attr, value) => {
            let seletor
            switch(component){
                case 'temporizador':
                    seletor = '.temporizadorConteiner'
                    break
                case 'digitosConteiner':
                    seletor = '.temporizadorConteiner .temporizador'
                case 'digitos':
                    seletor = '.temporizadorConteiner .temporizador .digito'
                    break
                case 'botoesConteiner':
                    seletor = '.temporizadorConteiner .botoes'
                case 'botoes':
                    seletor = '.temporizadorConteiner .botoes .botao'
                case 'separador':
                    seletor = '.temporizadorConteiner .temporizador .separador'
                    break
                default:
                    seletor = component
            }
            $(seletor).css(attr, value)
        } 

        args.css = cssControle(args.css.componente, args.css.atributo, args.css.valor)
        args.posicao = cssControle('temporizador', 'position', args.posicao)
        args.display = cssControle('temporizador', 'display', args.display)
        args.left = cssControle('temporizador', 'left',  args.left)
        args.top = cssControle('temporizador', 'top',   args.top)
    }
}

const Chrono = new Cronometro()
