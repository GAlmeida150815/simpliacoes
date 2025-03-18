// Importing necessary React hooks and components
import React, { useEffect, useState } from 'react';

// Importing components from Reactstrap library
import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Table,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Input,
  CardHeader,
  CardFooter,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

// Importing chart components from Recharts library
import { 
  PieChart, 
  Pie,
  Legend, 
  Tooltip, 
  Cell,
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer
} from 'recharts';

// Importing custom components
import Page from "../Page";

// Configuration and utility modules
import { addCommas } from 'utils/helperFunctions';
import { useLoading } from "components/Hooks/LoadingHook";
import * as config from 'config.js';



const Calculator = () => {
  // View and Table Control
  const [type, setType] = useState(0);
  const [tablePage, setTablePage] = useState(0);
  const [tableType, setTableType] = useState(0);

  // Dynamic Inputs
  const [currentInputs, setCurrentInputs] = useState([]);

  // Contribution Details
  const [contributionTiming, setContributionTiming] = useState("start");
  const [contributionFrequency, setContributionFrequency] = useState("monthly");
  const [contributionPeriod, setContributionPeriod] = useState(1);

  // Financial Values
  const [values, setValues] = useState({
    final: { starting: 20000, target: 1000000, after: 10, return: 6, compound: "anualmente", additional: 1000 },
    additional: { starting: 20000, target: 1000000, after: 10, return: 6, compound: "anualmente", additional: 1000 },
    return: { starting: 20000, target: 1000000, after: 10, return: 6, compound: "anualmente", additional: 1000 },
    starting: { starting: 20000, target: 1000000, after: 10, return: 6, compound: "anualmente", additional: 1000 },
    longevity: { starting: 20000, target: 1000000, after: 10, return: 6, compound: "anualmente", additional: 1000 }
  });

  // Chart Data
  const [lineChartData, setLineChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const COLORS = ["#2196F3", "#4CAF50", "#E91E63"];

  // Results
  const [results, setResults] = useState({});
  const [additionalResults, setAdditionalResults] = useState(null);

  // Custom Hooks
  const { showLoading, hideLoading } = useLoading();
  
  useEffect(() => {
    setTablePage(0);
    handleResults();
  }, [results]);

  useEffect(() => {
    handleYearChange();
  }, [values.final.after,values.additional.after,values.longevity.after,values.return.after,values.starting.after]);

  useEffect(() => {
    setTimeout(() => {
      renderFields();
      setAdditionalResults(null);
      handleYearChange();
      handleCalculate();
    }, 200);
  }, [type]);

  //Helpers
  const getCompoundFrequency = (frequency) => {
    switch (frequency) {
      case "anualmente": return 1;
      case "semestralmente": return 2; 
      case "trimestralmente": return 4;
      case "mensalmente": return 12;
      case "quizenalmente": return 24;
      case "bi-semanalmente": return 26;
      case "semanalmente": return 52; 
      case "diariamente": return 365; 
      //case "continuamente": return null;
      default: return 0;
    }
  }

  const calculateInterest = (B, R, n) => {
    return (B * Math.pow((1 + (R/n)),(n*(1/12)))) - B;
  };
  
  const interestCalculator = (PV, T, R, n, PMT, timing, frequency, VF = 0) => {
    let tableData = [];
    let SB = 0; // Current Balance
    let SP = PV; // Current Principal
    let EB = 0; // End Balance
    let EP = 0; // End Principal
  
    let TI = 0; // Total Interest
    let TC = 0; // Total Contribution


    for (let year = 1; year <= Math.floor(T); year++) { // ? Each Year
      const yearData = [];

      if (timing === "start" && frequency === "yearly") {
        SP += PMT;
        TC += PMT;
      }

      for (let month = 1; month <= 12; month++) { // ? Each Month

        if (timing === "start" && frequency === "monthly") {
          SP += PMT;
          TC += PMT;
        }

        SB = SP + TI;

        const CI = calculateInterest(SB,R,n);
        TI += CI;

        EB = SB + CI;
        EP = EB - TI;
 
        if (timing === "end" && (frequency === "monthly" || month === 12)) {
          EP += PMT;
          EB += PMT;
          TC += PMT;
        }

        const monthData = {
          startPrincipal: SP.toFixed(2),
          startBalance: SB.toFixed(2),
          interest: CI.toFixed(2),
          endBalance: EB.toFixed(2),
          endPrincipal: EP.toFixed(2)
        }

        yearData.push(monthData);
        SP = EP;
      }

      tableData.push(yearData);
    }

    if (T % 1 !== 0) { // ! Falta um ano "não inteiro"
      const yearData = [];
      
      const monthsLeft = Math.ceil(T % 1 * 12);
      const fractionedPMT = PMT / 12 * monthsLeft;

      if (timing === "start" && frequency === "yearly") {
        SP += fractionedPMT;
        TC += fractionedPMT;
      }

      for (let month = 1; month <= monthsLeft; month++) { // ? Each Month

        if (timing === "start" && frequency === "monthly") {
          SP += PMT;
          TC += PMT;
        }

        SB = SP + TI;

        const CI = calculateInterest(SB,R,n);
        TI += CI;

        EB = SB + CI;
        EP = EB - TI;
 
        if (timing === "end") {
          if (frequency === "monthly") {
            EP += PMT;
            EB += PMT;
            TC += PMT;
          } else if (month === monthsLeft){
            EP += fractionedPMT;
            EB += fractionedPMT;
            TC += fractionedPMT;
          }
        }

        const monthData = {
          startPrincipal: SP.toFixed(2),
          startBalance: SB.toFixed(2),
          interest: CI.toFixed(2),
          endBalance: EB.toFixed(2),
          endPrincipal: EP.toFixed(2)
        }

        yearData.push(monthData);
        SP = EP;
      }

      tableData.push(yearData);
    }

    return {
      endBalance: EB.toFixed(2),
      startingAmount: PV.toFixed(2),
      totalContributions: TC.toFixed(2),
      totalInterest: TI.toFixed(2),
      tableData,
    };
  }

  /*const calculateVF = (final) => {  // ! VFormula
    const PV = parseFloat(final.starting);
    const T = parseFloat(final.after);
    const R = parseFloat(final.return) / 100;
    const n = getCompoundFrequency(final.compound);
    const PMT = parseFloat(final.additional);
    const timing = contributionTiming; // "start" or "end"
    const frequency = contributionFrequency; // "monthly" or "yearly"
    const N = parseFloat(contributionPeriod) * (frequency === "monthly" ? 12 : 1);

    const NR = Math.pow(1+(R/n),(n/N)) - 1;

    let tableData = [];
    let totalInterest = 0;
    let totalContributions = 0;
    let endBalance = 0; 
  
    for (let year = 1; year <= T; year++) {
      const yearData = [];
      for (let month = 1; month <= 12; month++) {
        const effectiveMonth = (month + (year - 1) * 12);

        console.log(effectiveMonth);

        const POW = Math.pow(1+NR,effectiveMonth);
        const VF_PV = PV * POW;
        const VF_PMT  = PMT * ((POW-1)/NR) * (timing === "start" ? (1 + NR) : 1);
        const VF = VF_PV + VF_PMT;
  
        const startPrincipal = PV + PMT * (timing === "start" ? effectiveMonth - 1 : effectiveMonth);
        endBalance = VF;
        const endPrincipal = PV + PMT * effectiveMonth;
        const interest = endBalance - endPrincipal - totalInterest;
        const startBalance = startPrincipal - interest;
  
        totalInterest += interest;
        totalContributions += PMT;
  
        const monthData = {
          startPrincipal: startPrincipal.toFixed(2),
          startBalance: startBalance.toFixed(2),
          interest: interest.toFixed(2),
          endBalance: endBalance.toFixed(2),
          endPrincipal: endPrincipal.toFixed(2)
        }
        yearData.push(monthData);
      }
      tableData.push(yearData);
    }

    return {
      endBalance: endBalance.toFixed(2),
      startingAmount: PV.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      tableData,
    };
  };*/

  //* Calculations

  const calculateVF = (final) => { // ! VSequencial
    const PV = parseFloat(final.starting);
    const T = parseFloat(final.after);
    const R = parseFloat(final.return) / 100;
    const n = getCompoundFrequency(final.compound);
    const PMT = parseFloat(final.additional);
    const timing = contributionTiming; // "start" or "end"
    const frequency = contributionFrequency; // "monthly" or "yearly"

    return interestCalculator(PV,T,R,n,PMT,timing,frequency);
  };

  const calculatePMT = (additional) => {
    const VP = parseFloat(additional.starting);
    const T = parseFloat(additional.after);
    const R = parseFloat(additional.return) / 100;
    const n = getCompoundFrequency(additional.compound);
    const VF = parseFloat(additional.target);
    const timing = contributionTiming; // "start" or "end"
    const frequency = contributionFrequency; // "monthly" or "yearly"

    const NR = Math.pow(1+R/n,n/(frequency === "monthly" ? 12 : 1)) - 1;
    const PMT = getPMT(timing,frequency, VF, VP, NR, n, T);

    setAdditionalResults(`Irá ter de contribuir <b>${addCommas(PMT.toFixed(2))}€</b> no <b>${(timing === "start" ? "ínicio" : "final")}</b> de cada <b>${(frequency === "monthly" ? "mês" : "ano")}</b> para chegar ao objetivo de <i>aproximadamente</i> <b>${addCommas(VF.toFixed(2))}€</b>`);

    return interestCalculator(VP,T,R,n,PMT,timing,frequency);
  };

  const getPMT  = (timing,frequency, VF, VP, NR, n, T) => {
    const N = (frequency === "monthly" ? 12 : 1);

    const UPPER = VF - VP * Math.pow(1+NR, T*N);
    const LOWER = ((Math.pow(1+NR, T*N) - 1)/NR) * (timing === "start" ? (1+NR) : 1);

    return UPPER/LOWER;
  }

  const calculateVP = (starting) => {
    const VF = parseFloat(starting.target);
    const T = parseFloat(starting.after);
    const R = parseFloat(starting.return) / 100;
    const n = getCompoundFrequency(starting.compound);
    const PMT = parseFloat(starting.additional);
    const timing = contributionTiming; // "start" or "end"
    const frequency = contributionFrequency; // "monthly" or "yearly"

    const NR = Math.pow(1+R/n,n/(frequency === "monthly" ? 12 : 1)) - 1;
    const VP = getVP(timing,frequency,VF,PMT,NR,T)

    setAdditionalResults(`Irá ter de investir <b>${addCommas(VP.toFixed(2))}€</b> no ínicio para chegar ao objetivo de <b>${addCommas(VF.toFixed(2))}€</b>`);

    return interestCalculator(VP,T,R,n,PMT,timing,frequency);
  }

  const getVP = (timing,frequency,VF,PMT,NR,T) => {
    const N = (frequency === "monthly" ? 12 : 1);
    
    const POW = Math.pow(1 + NR, N*T);
    const UPPER = VF - PMT * ((POW - 1)/NR) * (timing === "start" ? (1+NR) : 1);
    const LOWER = POW;


    return UPPER/LOWER;
  }

  const calculateT = (longevity) => {
    const VF = parseFloat(longevity.target);
    const VP = parseFloat(longevity.starting);
    const R = parseFloat(longevity.return) / 100;
    const n = getCompoundFrequency(longevity.compound);
    const PMT = parseFloat(longevity.additional);
    const timing = contributionTiming; // "start" or "end"
    const frequency = contributionFrequency; // "monthly" or "yearly"
    
    const N = (frequency === "monthly" ? 12 : 1);
    const NR = Math.pow(1+R/n,n/N) - 1;

    const T = getT(timing, VP, VF, PMT, NR, N);

    setAdditionalResults(`Precisará de investir <b>${T.toFixed(3)}</b> anos chegar ao objetivo de <i>aproximadamente</i> <b>${addCommas(VF.toFixed(2))}€</b>`);

    return interestCalculator(VP, T,R,n,PMT,timing,frequency,VF);
  }

  const getT = (timing, VP, VF, PMT, NR, N) => { // ! Newton-Raphson Method Iteration
    const tolerance = 1e-10; 
    let guess = 10;

    const calculateFV = (T) => {
      const VF_VP = VP * Math.pow(1 + NR, N * T);
      const VF_PMT = PMT * (Math.pow(1 + NR, N * T) - 1) * (timing === "start" ? (1 + NR) : 1) / NR;
      return VF_PMT + VF_VP; 
    }

    const derivative = (T) => {
      return (calculateFV(T + 0.5) - calculateFV(T)) / 0.5;
    }

    while (true) {
      let f = calculateFV(guess) - VF; 
      let fPrime = derivative(guess);
      let nextGuess = guess - f / fPrime;
      
      if (Math.abs(nextGuess - guess) < tolerance) {
        return nextGuess;
      }
      guess = nextGuess;
    }
  }

  const calculateR = (ret) => {
    const VF = parseFloat(ret.target);
    const VP = parseFloat(ret.starting);
    const T = parseFloat(ret.after);
    const n = getCompoundFrequency(ret.compound);
    const PMT = parseFloat(ret.additional);
    const timing = contributionTiming; // "start" or "end"
    const frequency = contributionFrequency; // "monthly" or "yearly"
    
    const N = (frequency === "monthly" ? 12 : 1);

    const R = getR(timing, VP, VF, PMT, T, n, N);

    setAdditionalResults(`Precisará de uma taxa anual de <b>${(R * 100).toFixed(3)}%</b> para chegar ao objetivo de <i>aproximadamente</i> <b>${addCommas(VF.toFixed(2))}€</b>`);

    return interestCalculator(VP,T,R,n,PMT,timing,frequency);
  }

  const getR = (timing, VP, VF, PMT, T, n, N) => { // ! Newton-Raphson Method Iteration
    const tolerance = 1e-10; 
    let guess = 0.1;

    const calculateFV = (R) => {
      const NR = Math.pow(1+R/n,n/N) - 1;

      const VF_VP = VP * Math.pow(1 + NR, N * T);
      const VF_PMT = PMT * (Math.pow(1 + NR, N * T) - 1) * (timing === "start" ? (1 + NR) : 1) / NR;
      return VF_PMT + VF_VP; 
    }

    const derivative = (R) => {
      return (calculateFV(R + 0.0001) - calculateFV(R)) / 0.0001;
    }

    while (true) {
      let f = calculateFV(guess) - VF; 
      let fPrime = derivative(guess);
      let nextGuess = guess - f / fPrime;
      
      if (Math.abs(nextGuess - guess) < tolerance) {
      return nextGuess;
      }
      guess = nextGuess;
    }
  }

  //Renderers
  const renderFields = () => {
    setCurrentInputs([]);

    const inputsReturnal = [];
    const inputs = [
        // ? Final Amount
        [
            //Starting
            <FormGroup>
                <Label for={`${type}-starting`}>
                    Montante Inicial
                </Label>
                <FormText>
                {" "}€
                </FormText>
                <Input
                    id={`${type}-starting`}
                    name="number"
                    placeholder="€"
                    type="number"
                    defaultValue={values.final.starting}
                    min={0} 
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            final: {
                                ...prev.final,
                                starting: e.target.value
                            },
                        }));
                    }}
                />
            </FormGroup>,
            //After
            <FormGroup>
                <Label for={`${type}-after`}>
                    Após
                </Label>
                <FormText>
                {" "}anos
                </FormText>
                <Input
                  id={`${type}-after`}
                  name="number"
                  placeholder="anos"
                  type="number"
                  defaultValue={values.final.after}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          final: {
                              ...prev.final,
                              after: e.target.value
                          },
                      }));
                  }}
                />
            </FormGroup>,
            //Return
            <FormGroup>
                <Label for={`${type}-return`}>
                    Taxa de retorno
                </Label>
                <FormText>
                {" "}%
                </FormText>
                <Input
                    id={`${type}-return`}
                    name="number"
                    placeholder="%"
                    type="number"
                    defaultValue={values.final.return}
                    min={0} 
                    max={100}
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            final: {
                                ...prev.final,
                                return: e.target.value
                            },
                        }));
                    }}
                />
            </FormGroup>,
            //Compound
            <FormGroup>
                <Label for={`${type}-compound`}>
                    Composto
                </Label>
                <Input
                    type="select"
                    id={`${type}-compound`}
                    name="compound"
                    defaultValue={values.final.compound}
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            final: {
                                ...prev.final,
                                compound: e.target.value
                            },
                        }));
                    }}
                >
                    <option value="anualmente">Anualmente</option>
                    <option value="semestralmente">Semestralmente</option>
                    <option value="trimestralmente">Trimestralmente</option>
                    <option value="mensalmente">Mensalmente</option>
                    <option value="quizenalmente">Quinzenalmente</option>
                    <option value="bi-semanalmente">Bi-semanalmente</option>
                    <option value="semanalmente">Semanalmente</option>
                    <option value="diariamente">Diariamente</option>
                    <option value="continuamente" disabled>Continuamente</option>
                </Input>
            </FormGroup>,
            //Additional
            <FormGroup>
                <Label for={`${type}-additional`}>
                    Contribuições adicionais
                </Label>
                <FormText>
                {" "}€
                </FormText>
                <Input
                    id={`${type}-additional`}
                    name="number"
                    placeholder="€"
                    type="number"
                    defaultValue={values.final.additional}
                    min={0} 
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            final: {
                                ...prev.final,
                                additional: e.target.value
                            },
                        }));
                    }}
                />
            </FormGroup>,
        ],
        // ? Additional Contributions
        [
            //Target
            <FormGroup>
                <Label for={`${type}-target`}>
                    Objetivo
                </Label>
                <FormText>
                {" "}€
                </FormText>
                <Input
                    id={`${type}-target`}
                    name="number"
                    placeholder="€"
                    type="number"
                    defaultValue={values.additional.target}
                    min={0} 
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            additional: {
                                ...prev.additional,
                                target: e.target.value
                            },
                        }));
                    }}
                />
            </FormGroup>,
            //Starting
            <FormGroup>
                <Label for={`${type}-starting`}>
                    Montante Inicial
                </Label>
                <FormText>
                {" "}€
                </FormText>
                <Input
                    id={`${type}-starting`}
                    name="number"
                    placeholder="€"
                    type="number"
                    defaultValue={values.additional.starting}
                    min={0} 
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            additional: {
                                ...prev.additional,
                                starting: e.target.value
                            },
                        }));
                    }}
                />
            </FormGroup>,
            //After
            <FormGroup>
                <Label for={`${type}-after`}>
                    Após
                </Label>
                <FormText>
                {" "}anos
                </FormText>
                <Input
                    id={`${type}-after`}
                    name="number"
                    placeholder="anos"
                    type="number"
                    defaultValue={values.additional.after}
                    min={0} 
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            additional: {
                                ...prev.additional,
                                after: e.target.value
                            },
                        }));
                    }}
                />
            </FormGroup>,
            //Return
            <FormGroup>
                <Label for={`${type}-return`}>
                    Taxa de retorno
                </Label>
                <FormText>
                {" "}%
                </FormText>
                <Input
                    id={`${type}-return`}
                    name="number"
                    placeholder="%"
                    type="number"
                    defaultValue={values.additional.return}
                    min={0} 
                    max={100}
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            additional: {
                                ...prev.additional,
                                return: e.target.value
                            },
                        }));
                    }}
                />
            </FormGroup>,
            //Compound
            <FormGroup>
                <Label for={`${type}-compound`}>
                    Composto
                </Label>
                <Input
                    type="select"
                    id={`${type}-compound`}
                    name="compound"
                    defaultValue={values.additional.compound}
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            additional: {
                                ...prev.additional,
                                compound: e.target.value
                            },
                        }));
                    }}
                >
                    <option value="anualmente">Anualmente</option>
                    <option value="semestralmente">Semestralmente</option>
                    <option value="trimestralmente">Trimestralmente</option>
                    <option value="mensalmente">Mensalmente</option>
                    <option value="quizenalmente">Quinzenalmente</option>
                    <option value="bi-semanalmente">Bi-semanalmente</option>
                    <option value="semanalmente">Semanalmente</option>
                    <option value="diariamente">Diariamente</option>
                    <option value="continuamente" disabled>Continuamente</option>
                </Input>
            </FormGroup>,
        ],
        // ? Return Rate
        [
          //Target
          <FormGroup>
              <Label for={`${type}-target`}>
                  Objetivo
              </Label>
              <FormText>
              {" "}€
              </FormText>
              <Input
                  id={`${type}-target`}
                  name="number"
                  placeholder="€"
                  type="number"
                  defaultValue={values.return.target}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          return: {
                              ...prev.return,
                              target: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //Starting
          <FormGroup>
              <Label for={`${type}-starting`}>
                  Montante Inicial
              </Label>
              <FormText>
              {" "}€
              </FormText>
              <Input
                  id={`${type}-starting`}
                  name="number"
                  placeholder="€"
                  type="number"
                  defaultValue={values.return.starting}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          return: {
                              ...prev.return,
                              starting: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //After
          <FormGroup>
              <Label for={`${type}-after`}>
                  Após
              </Label>
              <FormText>
              {" "}anos
              </FormText>
              <Input
                  id={`${type}-after`}
                  name="number"
                  placeholder="anos"
                  type="number"
                  defaultValue={values.return.after}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          return: {
                              ...prev.return,
                              after: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //Additional
          <FormGroup>
              <Label for={`${type}-additional`}>
                  Contribuições adicionais
              </Label>
              <FormText>
              {" "}€
              </FormText>
              <Input
                  id={`${type}-additional`}
                  name="number"
                  placeholder="€"
                  type="number"
                  defaultValue={values.return.additional}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          return: {
                              ...prev.return,
                              additional: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
        ],
        // ? Starting Amount
        [
          //Target
          <FormGroup>
              <Label for={`${type}-target`}>
                  Objetivo
              </Label>
              <FormText>
              {" "}€
              </FormText>
              <Input
                  id={`${type}-target`}
                  name="number"
                  placeholder="€"
                  type="number"
                  defaultValue={values.starting.target}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          starting: {
                              ...prev.starting,
                              target: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //After
          <FormGroup>
              <Label for={`${type}-after`}>
                  Após
              </Label>
              <FormText>
              {" "}anos
              </FormText>
              <Input
                  id={`${type}-after`}
                  name="number"
                  placeholder="anos"
                  type="number"
                  defaultValue={values.starting.after}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          starting: {
                              ...prev.starting,
                              after: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //Return
          <FormGroup>
              <Label for={`${type}-return`}>
                  Taxa de retorno
              </Label>
              <FormText>
              {" "}%
              </FormText>
              <Input
                  id={`${type}-return`}
                  name="number"
                  placeholder="%"
                  type="number"
                  defaultValue={values.starting.return}
                  min={0} 
                  max={100}
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          starting: {
                              ...prev.starting,
                              return: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //Compound
          <FormGroup>
              <Label for={`${type}-compound`}>
                  Composto
              </Label>
              <Input
                  type="select"
                  id={`${type}-compound`}
                  name="compound"
                  defaultValue={values.starting.compound}
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          starting: {
                              ...prev.starting,
                              compound: e.target.value
                          },
                      }));
                  }}
              >
                  <option value="anualmente">Anualmente</option>
                  <option value="semestralmente">Semestralmente</option>
                  <option value="trimestralmente">Trimestralmente</option>
                  <option value="mensalmente">Mensalmente</option>
                  <option value="quizenalmente">Quinzenalmente</option>
                  <option value="bi-semanalmente">Bi-semanalmente</option>
                  <option value="semanalmente">Semanalmente</option>
                  <option value="diariamente">Diariamente</option>
                  <option value="continuamente" disabled>Continuamente</option>
              </Input>
          </FormGroup>,
          //Additional
          <FormGroup>
              <Label for={`${type}-additional`}>
                  Contribuições adicionais
              </Label>
              <FormText>
              {" "}€
              </FormText>
              <Input
                  id={`${type}-additional`}
                  name="number"
                  placeholder="€"
                  type="number"
                  defaultValue={values.starting.additional}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          starting: {
                              ...prev.starting,
                              additional: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
        ],
        // ? Investment Lenght
        [
          //Target
          <FormGroup>
              <Label for={`${type}-target`}>
                  Objetivo
              </Label>
              <FormText>
              {" "}€
              </FormText>
              <Input
                  id={`${type}-target`}
                  name="number"
                  placeholder="€"
                  type="number"
                  defaultValue={values.longevity.target}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          longevity: {
                              ...prev.longevity,
                              target: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //Starting
          <FormGroup>
              <Label for={`${type}-starting`}>
                  Montante Inicial
              </Label>
              <FormText>
              {" "}€
              </FormText>
              <Input
                  id={`${type}-starting`}
                  name="number"
                  placeholder="€"
                  type="number"
                  defaultValue={values.longevity.starting}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          longevity: {
                              ...prev.longevity,
                              starting: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //Return
          <FormGroup>
              <Label for={`${type}-return`}>
                  Taxa de retorno
              </Label>
              <FormText>
              {" "}%
              </FormText>
              <Input
                  id={`${type}-return`}
                  name="number"
                  placeholder="%"
                  type="number"
                  defaultValue={values.longevity.return}
                  min={0} 
                  max={100}
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          longevity: {
                              ...prev.longevity,
                              return: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
          //Compound
          <FormGroup>
              <Label for={`${type}-compound`}>
                  Composto
              </Label>
              <Input
                  type="select"
                  id={`${type}-compound`}
                  name="compound"
                  defaultValue={values.longevity.compound}
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          longevity: {
                              ...prev.longevity,
                              compound: e.target.value
                          },
                      }));
                  }}
              >
                  <option value="anualmente">Anualmente</option>
                  <option value="semestralmente">Semestralmente</option>
                  <option value="trimestralmente">Trimestralmente</option>
                  <option value="mensalmente">Mensalmente</option>
                  <option value="quizenalmente">Quinzenalmente</option>
                  <option value="bi-semanalmente">Bi-semanalmente</option>
                  <option value="semanalmente">Semanalmente</option>
                  <option value="diariamente">Diariamente</option>
                  <option value="continuamente" disabled>Continuamente</option>
              </Input>
          </FormGroup>,
          //Additional
          <FormGroup>
              <Label for={`${type}-additional`}>
                  Contribuições adicionais
              </Label>
              <FormText>
              {" "}€
              </FormText>
              <Input
                  id={`${type}-additional`}
                  name="number"
                  placeholder="€"
                  type="number"
                  defaultValue={values.longevity.additional}
                  min={0} 
                  onChange={(e) => {
                      setValues(prev => ({
                          ...prev,
                          longevity: {
                              ...prev.longevity,
                              additional: e.target.value
                          },
                      }));
                  }}
              />
          </FormGroup>,
        ]
    ]

    try {
        let i = 0;
        do {
            if (i === inputs[type].length - 1 ) {
                inputsReturnal.push(
                    <Row key={`row-${i}-${type}`} className='justify-content-center'>
                        <Col md={"6"}>
                            {inputs[type][i]}
                        </Col>
                    </Row>
                )
                break;
            }
            
            inputsReturnal.push(
                <Row key={`row${i}-${type}`}>
                    <Col md="6">
                        {inputs[type][i]}
                    </Col>
                    <Col md="6">
                        {inputs[type][i+1]}
                    </Col>
                </Row>
            )
            
            i += 2;
        } while (i <= inputs[type].length)
    } catch (error) {
        console.error(error);
    }

    setCurrentInputs(inputsReturnal);
  };

  //Handlers
  const handleCalculate = () => {
    showLoading();
    switch (type) {
      case 0:
        setResults(calculateVF(values.final));
      break;
      case 1: 
        setResults(calculatePMT(values.additional));
      break;
      case 2:
        setResults(calculateR(values.return));
      break;
      case 3:
        setResults(calculateVP(values.starting));
      break;
      case 4:
        setResults(calculateT(values.longevity));
      break;

      default: {
        console.error("Something went wrong...");
        return;
      }
    }
    hideLoading();
  };

  const handleResults = () => {
    if (Object.keys(results).length <= 0) 
      return -1;
    const lineData = [];
  
    let TI = 0;
    results.tableData.forEach((year, yearIndex) => {
      year.forEach((month,monthIndex) => {
        TI += parseFloat(month.interest);
        lineData.push({
          name: `${yearIndex + 1}º ano ${monthIndex + 1}º mês`,
          Montante: parseFloat(month.startPrincipal),
          Juros: TI.toFixed(2),
          Saldo: parseFloat(month.startBalance),
          amount: parseFloat(month.startPrincipal) + parseFloat(month.interest) + parseFloat(month.startBalance),
        });
      })
    });
    setLineChartData(lineData);

    const pieData = [
      { name: 'Montante Inicial', value: parseFloat(((results.startingAmount / results.endBalance) * 100).toFixed(2)) },
      { name: 'Juros', value: parseFloat(((results.totalInterest / results.endBalance) * 100).toFixed(2))},
      { name: 'Contribuições Totais', value: parseFloat(((results.totalContributions / results.endBalance) * 100).toFixed(2)) },
    ];
    setPieChartData(pieData);
  };

  const handleYearChange = () => {
    let max = 1000;
    switch (type) {
      case 0:
        max = contributionFrequency === "monthly" ? values.final.after * 12 : values.final.after;
        break;
      case 1:
        max = contributionFrequency === "monthly" ? values.additional.after * 12 : values.additional.after;
        break;
      case 2:
        max = contributionFrequency === "monthly" ? values.return.after * 12 : values.return.after;
        break;
      case 3:
        max = contributionFrequency === "monthly" ? values.starting.after * 12 : values.starting.after;
        break;
      case 4:
        max = contributionFrequency === "monthly" ? values.longevity.after * 12 : values.longevity.after;
        break;
      default: 
        return max;
    }
    
    if (contributionPeriod > max)
      setContributionPeriod(max)
    return max;
  };

  return (
    <Page>
      <>
        <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>
            <Container className="py-lg-md d-flex">
                <div className="col px-0">
                <Row>
                    <Col lg="12">
                    <div className="text-center">
                        <h3 className="display-3 text-white">
                        Calculadora de Investimentos
                        </h3>
                        <p className='text-center text-white' dangerouslySetInnerHTML={{ __html: config.textCalculator.replace(/\n/g, '<br />')}} />
                    </div>
                    </Col>
                </Row>
                </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
                >
                <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                />
                </svg>
            </div>
            </section>
            {/* 1st Hero Variation */}
        </div>
        <section fluid={true} className="section section-calculator section-lg">
          <Container>
            {/* Buttons && Inputs*/}
            <Row className='my-2'>
                <Card className='w-100'>
                    <CardHeader className='p-0'>
                      <ButtonGroup className="d-flex flex-wrap">
                        <Button
                          color="primary"
                          outline
                          onClick={() => {setType(0);}}
                          active={type === 0}
                          className="flex-fill mb-2 mx-1"
                        >
                          Montante Final
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={() => setType(1)}
                          active={type === 1}
                          className="flex-fill mb-2 mx-1"
                        >
                          Contribuições Adicionais
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={() => setType(2)}
                          active={type === 2}
                          className="flex-fill mb-2 mx-1"
                        >
                          Taxa de Retorno
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={() => setType(3)}
                          active={type === 3}
                          className="flex-fill mb-2 mx-1"
                        >
                          Montante Inicial
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={() => setType(4)}
                          active={type === 4}
                          className="flex-fill mb-2 mx-1"
                        >
                          Longevidade
                        </Button>
                      </ButtonGroup>
                    </CardHeader>
                    <CardBody > 
                        <Form 
                          id="inputsForm"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleCalculate();
                          }}  
                        >
                          {currentInputs}
                        </Form>
                    </CardBody>
                    <CardFooter>
                      <Row className='row-grid'> 
                        <Col lg="8">
                          Contribuir no {' '}
                          <FormGroup tag="fieldset" id="investmentTimer" className='d-inline-flex'>
                            <FormGroup check className='pr-1'>
                              <Input
                                name="investmentTiming"
                                type="radio"
                                defaultChecked={contributionTiming === "start"}
                                onChange={() => setContributionTiming("start")}
                              />
                              <b>início</b> {' '}
                            </FormGroup>
                            <FormGroup check className='pr-1'>
                              <Input
                                name="investmentTiming"
                                type="radio"
                                defaultChecked={contributionTiming === "end"}
                                onChange={() => setContributionTiming("end")}
                              />
                              <b>final</b> {' '}
                            </FormGroup>
                          </FormGroup>
                          de cada {' '}
                          
                          {
                            /* // TODO 
                              <Input
                                name="number"
                                type="number"
                                className="contribution-period-input"
                                min={1}
                                max={handleYearChange()}
                                value={contributionPeriod}
                                onChange={(e) => setContributionPeriod(parseFloat(e.target.value))}
                              /> {' '}
                              <FormGroup tag="fieldset" id="investmentFrequency" className='d-inline-flex'>
                                <FormGroup check className='pr-1'>
                                  <Input
                                    name="investmentFrequency"
                                    type="radio"
                                    defaultChecked={contributionFrequency === "monthly"}
                                    onChange={() => setContributionFrequency("monthly")}
                                  />
                                  <b>mês/es</b> {' '}
                                </FormGroup>
                                <FormGroup check className='pr-1'>
                                  <Input
                                    name="investmentFrequency"
                                    type="radio"
                                    defaultChecked={contributionFrequency === "yearly"}
                                    onChange={() => setContributionFrequency("yearly")}
                                  />
                                  <b>ano/s</b> {' '}
                                </FormGroup>
                              </FormGroup>
                            */
                          }
                          <FormGroup tag="fieldset" id="investmentFrequency" className='d-inline-flex'>
                            <FormGroup check className='pr-1'>
                              <Input
                                name="investmentFrequency"
                                type="radio"
                                defaultChecked={contributionFrequency === "monthly"}
                                onChange={() => setContributionFrequency("monthly")}
                              />
                              <b>mês</b> {' '}
                            </FormGroup>
                            <FormGroup check className='pr-1'>
                              <Input
                                name="investmentFrequency"
                                type="radio"
                                defaultChecked={contributionFrequency === "yearly"}
                                onChange={() => setContributionFrequency("yearly")}
                              />
                              <b>ano</b> {' '}
                            </FormGroup>
                          </FormGroup>
                        </Col>
                        <Col lg="4" className='d-flex justify-content-md-end justify-content-center'>
                            <Button
                                color="info"
                                type="submit"
                                form="inputsForm"
                            >
                              Calcular
                            </Button>
                        </Col>
                      </Row>
                    </CardFooter>
                </Card>
            </Row>
            {/* Results */}
            <Row className='my-2'>
              <Container>
                  <Table responsive className='text-center'>
                    <thead>
                      <tr>
                        <th />
                        <th>Saldo Final</th>
                        <th>Montante Inicial</th>
                        <th>Total de Contribuições</th>
                        <th>Juros Totais</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      Object.keys(results).length > 0 && (
                          <tr>
                            <th scope="row">Resultados</th>
                            <td>{addCommas(results.endBalance)}€</td>
                            <td>{addCommas(results.startingAmount)}€</td>
                            <td>{addCommas(results.totalContributions)}€</td>
                            <td>{addCommas(results.totalInterest)}€</td>
                          </tr>
                      )
                    }
                    </tbody>
                    <tfoot>
                      <tr className="text-center" key={`additional_info`}>
                        <td scope='row' colSpan="5">
                          {additionalResults != null && (
                            <span dangerouslySetInnerHTML={{ __html: additionalResults}} />
                          )}  
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
              </Container>
            </Row>
            {/* Charts */}
            <Row className="row-grid my-2">
                <Col lg="7" className="d-flex align-items-center justify-content-center">
                  <ResponsiveContainer width="100%" height={300}>
                  {
                    Object.keys(lineChartData).length > 0 && (
                      <LineChart LineChart width="100%" data={lineChartData}>
                        <XAxis dataKey="name" interval={12} tickFormatter={(value) => value.substr(0, value.indexOf('º') + 1)} />
                        <YAxis tickFormatter={(value) => value = `${addCommas(value)}€`} />
                        <Tooltip formatter={(value) => value = `${addCommas(value)}€`} />
                        <Legend />
                        <Line type="monotone" dataKey="Montante" stroke={COLORS[0]} dot={false} />
                        <Line type="monotone" dataKey="Juros" stroke={COLORS[1]} dot={false} />
                        <Line type="monotone" dataKey="Saldo" stroke={COLORS[2]} dot={false} />
                      </LineChart>
                    )
                  }
                  </ResponsiveContainer>
                </Col>
                <Col lg="5" className="d-flex align-items-center justify-content-center">
                <ResponsiveContainer width="100%" height={300}>
                  {
                    Object.keys(pieChartData).length > 0 && (
                      <PieChart width="100%">
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={({value}) => value = `${value}%`}
                        >
                            {
                              pieChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                              ))
                            }
                        </Pie>
                        <Tooltip formatter={(value,entry) => {
                            value = `${value}%; `;
                            switch (entry) {
                              case "Montante Inicial":
                                value += `${addCommas(results.startingAmount)}€ `;
                              break;
                              case "Juros":
                                value += `${addCommas(results.totalInterest)}€ `;
                              break;
                              case "Contribuições Totais":
                                value += `${addCommas(results.totalContributions)}€ `;
                              break;
                              default:
                                return -1;
                            }
                            return value;
                          }} />
                        <Legend />
                      </PieChart>
                    ) 
                  }
                </ResponsiveContainer>
              </Col>
            </Row>
            {/* Table */}
            <Row className='my-2'>
                <Table responsive striped hover className='text-center'>
                  <thead>
                    <tr>
                      <th scope="row"  colSpan="6">
                        <ButtonGroup>
                          <Button
                            color="primary"
                            outline
                            onClick={() => {setTableType(0);}}
                            active={tableType === 0}
                            className="flex-fill mb-2 mx-1"
                          >
                            Anual
                          </Button>
                          <Button
                            color="primary"
                            outline
                            onClick={() => {setTableType(1);}}
                            active={tableType === 1}
                            className="flex-fill mb-2 mx-1"
                          >
                            Mensal
                          </Button>
                        </ButtonGroup>
                      </th>
                    </tr>
                    <tr>
                        <th />
                        <th>Principal Inicial</th>
                        <th>Saldo Inicial</th>
                        <th>Juros</th>
                        <th>Saldo Final</th>
                        <th>Principal Final</th>
                    </tr>
                  </thead>
                  {
                    results && (
                      <tbody>
                        { 
                          tableType === 0 ? (
                            Object.keys(results).length > 0 && (
                              <React.Fragment key={tablePage}>
                                {results.tableData.map((year, yearIndex) => {
                                  let totalInterest = 0;
                                  year.forEach((month) => {
                                    totalInterest += parseFloat(month.interest);
                                  })
                                  return (
                                    <tr key={`year_${yearIndex}`}>
                                      <th scope="row">{yearIndex + 1}º ano</th>
                                      <td>{addCommas(year[0].startPrincipal)}€</td>
                                      <td>{addCommas(year[0].startBalance)}€</td>
                                      <td>{addCommas(totalInterest.toFixed(2))}€</td>
                                      <td>{addCommas(year[year.length - 1].endBalance)}€</td>
                                      <td>{addCommas(year[year.length - 1].endPrincipal)}€</td>
                                    </tr>
                                  );
                                })}
                              </React.Fragment>
                            )                            
                          ) : (
                            Object.keys(results).length > 0 && (
                              <React.Fragment key={tablePage}>
                                <tr className="text-center" key={`year_${tablePage}`}>
                                  <th scope='row' colSpan="6">{tablePage + 1}º Ano</th>
                                </tr>
                                {results.tableData[tablePage].map((month, monthIndex) => (
                                  <tr key={`year_${tablePage}_month_${monthIndex}`}>
                                    <th scope="row">{monthIndex + 1}</th>
                                    <td>{addCommas(month.startPrincipal)}€</td>
                                    <td>{addCommas(month.startBalance)}€</td>
                                    <td>{addCommas(month.interest)}€</td>
                                    <td>{addCommas(month.endBalance)}€</td>
                                    <td>{addCommas(month.endPrincipal)}€</td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            )
                          )
                        }
                      </tbody>
                    )
                  }
                  {
                    tableType === 1 && (
                      <tfoot>
                        <tr>
                          <th scope='row' colSpan="6">
                            {Object.keys(results).length > 0 && (
                              <Pagination className='d-flex justify-content-center'>
                                {/* First */}
                                <PaginationItem disabled={tablePage === 0}>
                                  <PaginationLink first onClick={() => setTablePage(0)} />
                                </PaginationItem>
                                {/* Previous */}
                                <PaginationItem disabled={tablePage === 0}>
                                  <PaginationLink previous onClick={() => setTablePage(tablePage - 1)} />
                                </PaginationItem>
                                {/* 1 Previous, Current, and 1 Next */}
                                {
                                  tablePage !== 0 && (
                                    <PaginationItem disabled={tablePage === 0}>
                                      <PaginationLink onClick={() => setTablePage(tablePage - 1)}>{tablePage}</PaginationLink>
                                    </PaginationItem>
                                  )
                                }
                                <PaginationItem active>
                                  <PaginationLink disabled>{tablePage + 1}</PaginationLink>
                                </PaginationItem>
                                {
                                  tablePage + 1 !== Object.keys(results).length && (
                                    <PaginationItem disabled={tablePage === Object.keys(results.tableData).length - 1}>
                                      <PaginationLink onClick={() => setTablePage(tablePage + 1)}>{tablePage + 2}</PaginationLink>
                                    </PaginationItem>
                                  )
                                }
                                {/* Next */}
                                <PaginationItem disabled={tablePage === Object.keys(results.tableData).length - 1}>
                                  <PaginationLink next onClick={() => setTablePage(tablePage + 1)} />
                                </PaginationItem>
                                {/* Last */}
                                <PaginationItem disabled={tablePage === Object.keys(results.tableData).length - 1}>
                                  <PaginationLink last onClick={() => setTablePage(Object.keys(results.tableData).length - 1)} />
                                </PaginationItem>
                              </Pagination>
                            )}
                          </th>
                        </tr>
                      </tfoot>
                    )
                  }
                </Table>
            </Row>
          </Container>
        </section>
      </>
    </Page>
  );
};

export default Calculator;
