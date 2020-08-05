function Temporizador(){
    this.init = function(args){
        
        function criarElemento(elemento, classe, html = '') {
            const e = document.createElement(elemento)
            e.classList.add(classe)
            e.innerHTML = html
            return e
        }
        
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
        
        
        function timeCount(){
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
        
        
        function startStop(){
            if(status == "stopped"){
                interval = window.setInterval(timeCount, (1000 * args.seconds) )   
                status = "started"
                if(botaoStartStop){
                    botaoStartStop.innerHTML = "STOP"      
                }
            } else {
                window.clearInterval(interval)
                status = "stopped" 
                if(botaoStartStop){
                    botaoStartStop.innerHTML = "START"  
                }
            }
        } 
        
        function resetTimer(){
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

        if(args.buttons){
            const botoes = criarElemento('div', 'botoes')
            tempConteiner.appendChild(botoes)
            botoes.appendChild(criarElemento('button', 'botao', 'PLAY'))
            botoes.appendChild(criarElemento('button', 'botao', 'RESET'))

            const botaoStartStop = document.querySelectorAll('.botao')[0]
            const botaoReset = document.querySelectorAll('.botao')[1]

            botaoStartStop.onclick = startStop
            botaoReset.onclick = resetTimer
        }        
        
    }

    this.ajusteCSS = function(color){
        $('.temporizador').css('background-color', color)
    }
}

const Chrono = new Temporizador()
    

