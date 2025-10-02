import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleEvaluate = () => {
    try {
      const evalResult = Function(`"use strict"; return (${input})`)();
      setResult(evalResult.toString());
    } catch (error) {
      setResult("Erreur");
    }
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const renderButton = (
    label: string,
    onPress: () => void,
    style?: any,
    span?: number
  ) => (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        span ? { width: `${25 * span}%` } : null,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculator}>
        <View style={styles.display}>
          <Text style={styles.inputText}>{input || "0"}</Text>
          {result ? <Text style={styles.resultText}>{result}</Text> : null}
        </View>

        <View style={styles.buttons}>
          {renderButton("AC", handleClear, styles.clearButton)}
          {renderButton("←", handleBackspace, styles.operationButton)}
          {renderButton("%", () => handleClick("%"), styles.operationButton)}
          {renderButton("x", () => handleClick("*"), styles.operationButton)}

          {renderButton("7", () => handleClick("7"))}
          {renderButton("8", () => handleClick("8"))}
          {renderButton("9", () => handleClick("9"))}
          {renderButton("-", () => handleClick("-"), styles.operationButton)}

          {renderButton("4", () => handleClick("4"))}
          {renderButton("5", () => handleClick("5"))}
          {renderButton("6", () => handleClick("6"))}
          {renderButton("+", () => handleClick("+"), styles.operationButton)}

          {renderButton("1", () => handleClick("1"))}
          {renderButton("2", () => handleClick("2"))}
          {renderButton("3", () => handleClick("3"))}
          {renderButton("/", () => handleClick("/"), styles.operationButton)}

          {renderButton("0", () => handleClick("0"))}
          {renderButton(".", () => handleClick("."))}
          {renderButton("=", handleEvaluate, styles.equalButton, 2)} 
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  calculator: {
    backgroundColor: "#111111",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  display: {
    backgroundColor: "#333",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    minHeight: 70,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 28,
    color: "white",
    textAlign: "right",
  },
  resultText: {
    fontSize: 22,
    color: "#4caf50",
    textAlign: "right",
    marginTop: 5,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: "25%",
    marginVertical: 5,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
  },
  operationButton: {
    backgroundColor: "#ff9800",
  },
  clearButton: {
    backgroundColor: "#f44336",
  },
  equalButton: {
    backgroundColor: "#4caf50",
  },
});
