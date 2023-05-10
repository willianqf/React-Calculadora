import React, { useState } from 'react'

export default function App() {

  // Iniciando os State da Calculadora
  const [valorTela, setValorTela] = useState('')
  const [resultado, setResultado] = useState(0)
  const [acumulador, setAcumulador] = useState(0)
  const [operacao, setOperacao] = useState(false)
  const [digitouOperacao, setDigitouOperacao] = useState(false)
  const [ponto, setPonto] = useState(false)

  // Elementos e Componentes
  const Tela = (valor, resultado) => {
    return (
      <div style={cssTela}>
        <span style={cssTelaOper}>{valor}</span>
        <span style={cssTelaRes}>{resultado}</span>
      </div>
    )
  }

  const VerificaInicio = (digito, valorTela) => {
    if (valorTela[0] == null) {
      setValorTela('0' + digito)
      setPonto(true)
      return true
    } else if (valorTela[valorTela.length - 1] == '+' || valorTela[valorTela.length - 1] == '-' || valorTela[valorTela.length - 1] == '*' || valorTela[valorTela.length - 1] == '/') {
      setValorTela(valorTela + '0' + digito)
      setPonto(true)
      return true
    }
    return false
  }

  // Funções 
  const addDigitotela = (digito) => {
    if (digito == '.') {
      if (VerificaInicio(digito, valorTela)) {
        return
      }
    }

    if ((digito == '+' || digito == '-' || digito == '*' || digito == '/') && operacao) {
      setOperacao(false)
      setValorTela(resultado + digito)
      setDigitouOperacao(true)
      return
    }

    if (operacao) {
      let novaoperacao = digito
      if (novaoperacao == '.') {
        novaoperacao = '0.'
        setPonto(true)
      }
      setValorTela(novaoperacao)
      setOperacao(false)
      return
    }

    if ((digito == '+' || digito == '-' || digito == '*' || digito == '/')) {
      if (!digitouOperacao) {
        let DigitoZero = ''
        if (valorTela[valorTela.length - 1] == '.') {
          DigitoZero = '0'
        }
        const valorDigitadoTela = valorTela + DigitoZero + digito
        setValorTela(valorDigitadoTela)
      }

      setPonto(false)
      setDigitouOperacao(true)
    } else {
      if (digito == '.') {

        if (ponto) {
          return
        }

        const valorDigitadoTela = valorTela + digito
        setValorTela(valorDigitadoTela)
        setDigitouOperacao(false)
        setPonto(true)
        return
      }

      const valorDigitadoTela = valorTela + digito
      setValorTela(valorDigitadoTela)
      setDigitouOperacao(false)

    }


  }

  const LimparMemoria = () => {
    setOperacao(false)
    setValorTela('')
    setResultado(0)
    setAcumulador(0)
    setPonto(false)
    return
  }

  const Operacao = (oper) => {
    if (oper == 'bs') {
      let vTela = valorTela
      if (vTela[vTela.length - 1] == '.') {
        setPonto(false)
      }
      vTela = vTela.substring(0, (vTela.length - 1)) // Deleta uma determinada posição de uma Array de String
      setValorTela(vTela)
      setOperacao(false)
      return
    }

    // Realização do Calculo da Calculadora
    try {
      setPonto(false)
      const r = eval(valorTela)
      setAcumulador(r)
      setResultado(r)
      setOperacao(true)
    } catch {
      setResultado('Err')
    }
  }



  const Btn = (label, funcao) => {
    return (
      <button style={cssBtn} onClick={funcao}>{label}</button>
    )
  }

  // Funções de Estilos - CSS
  const cssContainer = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300,
    border: '1px solid'
  }

  const cssBotoes = {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

  const cssTela = {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#444',
    flexDirection: 'column',
    width: 260
  }

  const cssTelaOper = {
    fontSize: 25,
    color: '#fff',
    height: 20
  }

  const cssTelaRes = {
    fontSize: 50,
    color: '#fff'
  }

  const cssBtn = {
    fontSize: 30,
    Height: 75,
    width: 75,
    padding: 20,
    backgroundColor: '#000',
    color: '#fff',
    borderColor: '#000',
    textAlign: 'center',
    outline: 'none'
  }

  return (
    <>
      <div style={cssContainer}>
        <h1>Calculadora por React - Simples</h1>
        {Tela(valorTela, resultado)}
        <div style={cssBotoes}>
          {Btn('AC', LimparMemoria)}
          {Btn('(', () => addDigitotela('('))}
          {Btn(')', () => addDigitotela(')'))}
          {Btn('/', () => addDigitotela('/'))}
          {Btn('7', () => addDigitotela('7'))}
          {Btn('8', () => addDigitotela('8'))}
          {Btn('9', () => addDigitotela('9'))}
          {Btn('*', () => addDigitotela('*'))}
          {Btn('4', () => addDigitotela('4'))}
          {Btn('5', () => addDigitotela('5'))}
          {Btn('6', () => addDigitotela('6'))}
          {Btn('-', () => addDigitotela('-'))}
          {Btn('1', () => addDigitotela('1'))}
          {Btn('2', () => addDigitotela('2'))}
          {Btn('3', () => addDigitotela('3'))}
          {Btn('+', () => addDigitotela('+'))}
          {Btn('0', () => addDigitotela('0'))}
          {Btn('.', () => addDigitotela('.'))}
          {Btn('<-', () => Operacao('bs'))}
          {Btn('=', () => Operacao('='))}
        </div>
      </div>
    </>
  )
}
