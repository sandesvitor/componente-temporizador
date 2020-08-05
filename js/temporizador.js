function Temporizador(){
    
    function criarElemento(elemento, classe, html = '') {
        const e = document.createElement(elemento)
        e.classList.add(classe)
        e.innerHTML = html
        return e
    }

    this.init = function(){        
        const tempConteiner = criarElemento('div', 'temporizadorConteiner')
        const temporizador = criarElemento('div', 'temporizador')
        
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
           
        
        
        const digitos = document.querySelectorAll('.temporizador .digito')
        let segundosUnidade = 0
        let segundosDezena = 0
        let minutosUnidade = 0
        let minutosDezena = 0
        let horaUnidade = 0
        let horaDezena = 0
        
        
        this.timeCount = function(){
            if(segundosUnidade < 9){
        
                digitos[5].innerHTML = `${++segundosUnidade}`
        
            } else if (segundosDezena < 5){
            
                segundosUnidade = 0
                digitos[4].innerHTML = `${++segundosDezena}`
                digitos[5].innerHTML = `${segundosUnidade}`
        
            } else if (minutosUnidade < 9) {
        
                segundosUnidade = 0
                segundosDezena = 0
                digitos[3].innerHTML = `${++minutosUnidade}`
                digitos[4].innerHTML = `${segundosDezena}`
                digitos[5].innerHTML = `${segundosUnidade}`
        
            } else if (minutosDezena < 5){
        
                segundosUnidade = 0
                segundosDezena = 0
                minutosUnidade = 0
                digitos[2].innerHTML = `${++minutosDezena}`
                digitos[3].innerHTML = `${minutosUnidade}`
                digitos[4].innerHTML = `${segundosDezena}`
                digitos[5].innerHTML = `${segundosUnidade}`
        
            } else if (horaUnidade < 9){
        
                segundosUnidade = 0
                segundosDezena = 0
                minutosUnidade = 0
                minutosDezena = 0
                digitos[1].innerHTML = `${++horaUnidade}`
                digitos[2].innerHTML = `${minutosDezena}`
                digitos[3].innerHTML = `${minutosUnidade}`
                digitos[4].innerHTML = `${segundosDezena}`
                digitos[5].innerHTML = `${segundosUnidade}`
        
            } else if (horaDezena < 9){
        
                segundosUnidade = 0
                segundosDezena = 0
                minutosUnidade = 0
                minutosDezena = 0
                horaUnidade = 0
                digitos[0].innerHTML = `${++horaDezena}`
                digitos[1].innerHTML = `${horaUnidade}`
                digitos[2].innerHTML = `${minutosDezena}`
                digitos[3].innerHTML = `${minutosUnidade}`
                digitos[4].innerHTML = `${segundosDezena}`
                digitos[5].innerHTML = `${segundosUnidade}`
        
            }
        }
        
      
        
        let interval = null
        let status = "stopped"
        this.start = () => {
            if(status === "stopped"){
                interval = window.setInterval(this.timeCount, 1000)   
                status = "started"
                if(botaoStartStop){
                    botaoStartStop.innerHTML = "STOP"      
                }
            } else if (status === "started") {
                window.clearInterval(interval)
                status = "stopped" 
                if(botaoStartStop){
                    botaoStartStop.innerHTML = "START"  
                }
            }           
        } 
        
        
        this.reset = () => {
            window.clearInterval(interval)
            digitos.forEach(digito => {
                digito.innerHTML = "0"
            })
        
            segundosUnidade = 0
            segundosDezena = 0
            minutosUnidade = 0
            minutosDezena = 0
            horaUnidade = 0
            horaDezena = 0
        
            botaoStartStop.innerHTML = "START"
            status = "stopped"
        }

        
        const botoes = criarElemento('div', 'botoes')
        tempConteiner.appendChild(botoes)
        botoes.appendChild(criarElemento('button', 'botao', 'PLAY'))
        botoes.appendChild(criarElemento('button', 'botao', 'RESET'))

        const botaoStartStop = document.querySelectorAll('.botao')[0]
        const botaoReset = document.querySelectorAll('.botao')[1]

        botaoStartStop.onclick = this.start
        botaoReset.onclick = this.reset
               
        
    }

    this.controle = comando => {
        if (comando == 'start'){
            interval = window.setInterval(this.timeCount, 1000)
        }  else if (comando == 'stop') {
            window.clearInterval(interval)
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

        function cssControle(component, attr, value){
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

const Chrono = new Temporizador()