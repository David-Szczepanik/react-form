import React, {useState, useEffect} from "react";
import "./App.css";
import validatePositiveInt from "./functions/validatePositiveInt";
import ProgressBar from "./components/ProgressBar";
import Select from "./components/Select";
import Range from "./components/Range";
import NumImp from "./components/NumImp";
import TextArea from "./components/TextArea";
import File from "./components/File";
import Button from "./components/Button";
import saveText from "./functions/saveText";
import Clock from "./components/Clock";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import Image from "./components/Image";
import 'bootstrap/dist/css/bootstrap.min.css';
import chocolate from './pics/chocolate.png'
import vanilla from './pics/vanilla.png'
import mix from './pics/mix2.png'

function App() {
  const [initialCountDown, setInitialCountDown] = useState(0);
  const [countDown, setCountDown] = useState(0);

  const types = ["smetanová", "tvarohová"];

  const [type, setType] = useState("smetanová");
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [text, setText] = useState("");
  const [flavour, setFlavour] = useState("Vanilka");
  const [bonus, setBonus] = useState([]);
  const [show, setShow] = useState(true);

  const [imageSource, setImageSource] = useState(vanilla);

  useEffect(() => {
    let temp = prompt("Zadejte počet sekund pro odpočet.", 10);
    while (!validatePositiveInt(temp)) {
      temp = prompt("Zadejte počet sekund pro odpočet.", 10);
    }
    setInitialCountDown(parseInt(temp));
    setCountDown(parseInt(temp));
  }, []);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);

  const progress =
    countDown > 0
      ? ((initialCountDown - countDown) / initialCountDown) * 100
      : 100;

  const product = num1 + num2;

  const handleData = (data, source) => {
    switch (source) {
      case "sel-type": {
        setType(data);
        break;
      }
      // TODO:txb-1
      case "txb-1": {
        setText(data);
        break;
      }
      case "num-amount":
        if (data >= 1 && data <= 5) {
          setAmount(data);
          break;
        }
        break;
      case "num-1": {
        setNum1(Number(data));
        break;
      }
      case "num-2": {
        setNum2(Number(data));
        break;
      }
      case "txa-text": {
        setText(data);
        break;
      }
      case "file-load": {
        setText(data);
        break;
      }
      case "rbg-flavour": {
        setFlavour(data);
        if (data === "Vanilka") {
          setImageSource(vanilla);
        } else if (data === "Čokoláda") {
          setImageSource(chocolate);
        } else {
          setImageSource(mix);
        }
        break;
      }
      case "rng-size": {
        setSize(data);
        break;
      }
      case "chb-checkboxes": {
        setBonus(data);
        break;
      }
      default:
        break;
    }
  };

  const handleEvent = (source) => {
    switch (source) {
      case "btn-download": {
        saveText(text);
        break;
      }
      case "btn-reset": {
        setCountDown(initialCountDown);
        break;
      }
      case "btn-show": {
        setShow(true);
        break;
      }
      case "btn-hide": {
        setShow(false);
        break;
      }
      default:
        break;
    }
  };

  const remainingDiskSpacePercentage = (size / 100) * 100;

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row p-4">

          {/*----- 1nd -----*/}
          <p>
            {flavour} {bonus} {type} {amount}

          </p>
          <div className="col-6">

            <RbGroup
              label="Příchuť zmrzliny"
              id="rbg-flavour"
              selectedValue={flavour}
              handleData={handleData}
              dataIn={[
                {label: "Vanilka", value: "Vanilka"},
                {label: "Čokoláda", value: "Čokoláda"},
                {label: "Míchaná", value: "Mix"},
              ]}
            />


            <Image source={imageSource} id="flavour" enabled={show} width="100%"/>


            <ChbGroup
              label="Něco navrch?"
              id="chb-checkboxes"
              selectedValue={bonus}
              handleData={handleData}
              dataIn={[
                {label: "oříšky", value: ", oříšky"},
                {label: "čoko hoblinky", value: ", čoko hoblinky"},
                {label: "karamel", value: ", karamel"},
              ]}
            />

            <NumImp
              id="num-amount"
              label="Počet kopečků (max. 5)"
              dataIn={amount}
              handleData={handleData}
            />

            <Select
              label="Druh zmrzliny"
              id="sel-type"
              selectedValue={type}
              dataIn={types}
              handleData={handleData}
            />


          </div>

          {/*----- 2nd -----*/}
          <div className="col-6">

            <ProgressBar id="pgb-progress" dataIn={progress}/>
            <b>Instalace probíhá, zbývá {countDown} sekund</b>


            <div className="row">
              <div className="col-6">


                <NumImp
                  id="num-1"
                  label="sčítanec 1"
                  dataIn={num1}
                  handleData={handleData}
                />
              </div>
              <div className="col-6">

                <NumImp
                  id="num-2"
                  label="sčítanec 2"
                  dataIn={num2}
                  handleData={handleData}
                />
              </div>
            </div>
            <p>Součet dvou čísel: {product}</p>

            {/*-----*/}

            {/*TEXT AREA*/}
            <TextArea
              id="txa-text"
              label="Operace s textem"
              dataIn={text}
              handleData={handleData}
              height={200}
            />
            <br/>

            {/*-----ROW-----*/}
            <div className="row">
              <div className="col-6">

                <File
                  id="file-load"
                  label="Načti text ze souboru"
                  handleData={handleData}
                />

              </div>
              <div className="col-6">

                <Button
                  id="btn-download"
                  label="Stáhni soubor s textem"
                  handleEvent={handleEvent}
                />

              </div>
            </div>
            {/*-----ROW/> -----*/}
            {/*--- TA/> ---*/}

            <br/>
            <Range
              min="0"
              max="100"
              label="Místo na disku"
              id="rng-size"
              dataIn={size}
              handleData={handleData}
            />

            <Clock/>
            <p>zbývá {Math.floor(remainingDiskSpacePercentage)}% místa na disku</p>




          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
