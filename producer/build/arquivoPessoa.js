class contaCliente{
    constructor(numeroConta,saldo,debido,credito){
        this.numeroConta = numeroConta;
        this.saldo = saldo;
        this.debido = debido;
        this.credito = credito;
    }
    calcularSaldoAtual(){
        return this.saldo - this.debido + this.credito
    }
    verificarSaldo(){
        const saldoAtual = this.calcularSaldoAtual()
        if(saldoAtual >= 0){
            alert("Saldo positivo R$ " + saldoAtual);
        }
        else{
            alert("Saldo negativo R$ " + saldoAtual);
        }
    }
}
let numeroConta = prompt("Digite o numero da conta do cliente");
let saldo = parseFloat(prompt("Digite o saldo do cliente"));
let debido = parseFloat(prompt("Digite o debito do cliente"));
let credito = parseFloat(prompt("Digite o Saldo do cliente"));

let conta = new contaCliente(numeroConta,saldo,debido,credito);
conta.verificarSaldo();