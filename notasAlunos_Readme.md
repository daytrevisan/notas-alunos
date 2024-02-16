<p>Calcular a situação de cada aluno baseado na média das 3 provas (P1, P2 e P3), conforme a  tabela:</p> 

<p>Média (m) Situação:</p>

<div align="center" style="margin-bottom:10px">

```
    m < 5
    Reprovado por Nota 

    5 <= m <7
    Exame Final

    m >= 7
    Aprovado
```

</div>

<p>Caso o número de faltas ultrapasse 25% do número total de aulas o aluno terá a situação "Reprovado por Falta", independente da média.  Caso a situação seja "Exame Final" é necessário calcular a "Nota para Aprovação Final"(naf) de  cada aluno de acordo com seguinte fórmula: </p>

<div align="center" style="margin-bottom:10px">

```
5 <= (m + naf) / 2
```

</div>

<p>Caso a situação do aluno seja diferente de "Exame Final", preencha o campo "Nota para Aprovação Final" com 0.</p>

<p>Arredondar o resultado para o próximo número inteiro (aumentar) caso necessário. Utilizar linhas de logs para acompanhamento das atividades da aplicação.</p>

<p>Os textos do código fonte (atributos, classes, funções, comentários e afins) devem ser escritos  em inglês, salvo os identificadores e textos pré-definidos nesse desafio.</p>



preciso ler uma planilha no google sheet online por meio de uma api pelo javascript
nesta planilha, preciso que se leia as faltas dos alunos (coluna C4:C27), notas P1 (D4:D27), notas P2 (E4:E27) e notas P3 (F4:F27)
a coluna G (de G4:G27) precisa preencher na planilha os seguintes status: "Reprovado por falta" caso as faltas ultrapassem 25%, "Reprovado por nota" caso a média de P1, P2 e P3 seja inferior a 5, "Exame final" caso a média de P1, P2 e P3 seja seja igual a 5 e menor que 7, ou "Aprovado" caso a média entre P1, P2 e P3 seja igual ou maior do que 7
além disso, na coluna H (H4:H27), precisa preencher na planilha a nota final do aluno