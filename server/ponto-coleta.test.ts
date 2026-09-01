/** @vitest-environment jsdom */
import { createElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Home from "../client/src/pages/Home";
import { canSubmitPreCadastro, isValidCpf } from "../client/src/lib/preCadastro";

afterEach(() => cleanup());

describe("pré-cadastro de ponto de coleta", () => {
  it("valida um CPF correto", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
  });

  it("rejeita CPF com dígitos repetidos ou inválidos", () => {
    expect(isValidCpf("111.111.111-11")).toBe(false);
    expect(isValidCpf("529.982.247-24")).toBe(false);
    expect(isValidCpf("123")).toBe(false);
  });

  it("só habilita o envio quando os campos obrigatórios estão completos", () => {
    const base = { name: "Ana Souza", cpf: "529.982.247-25", fileName: "conta.pdf", consent: true };
    expect(canSubmitPreCadastro(base)).toBe(true);
    expect(canSubmitPreCadastro({ ...base, consent: false })).toBe(false);
    expect(canSubmitPreCadastro({ ...base, fileName: "" })).toBe(false);
    expect(canSubmitPreCadastro({ ...base, name: "Ana" })).toBe(false);
    expect(canSubmitPreCadastro({ ...base, cpf: "529.982.247-24" })).toBe(false);
  });

  it("leva um preenchimento válido até a tela de confirmação", () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "Ana Souza" } });
    fireEvent.change(screen.getByLabelText(/^CPF/i), { target: { value: "52998224725" } });
    const file = new File(["comprovante demonstrativo"], "conta.pdf", { type: "application/pdf" });
    fireEvent.change(screen.getByLabelText(/Comprovante de endereço/i), { target: { files: [file] } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Enviar pré-cadastro/i }));
    expect(screen.getByRole("heading", { name: /Seu próximo passo começa aqui/i })).toBeTruthy();
    expect(screen.getByText(/enviaremos uma mensagem ao seu Gmail/i)).toBeTruthy();
  });

  it("não troca para confirmação quando o consentimento está ausente", () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "Ana Souza" } });
    fireEvent.change(screen.getByLabelText(/^CPF/i), { target: { value: "52998224725" } });
    const file = new File(["comprovante demonstrativo"], "conta.pdf", { type: "application/pdf" });
    fireEvent.change(screen.getByLabelText(/Comprovante de endereço/i), { target: { files: [file] } });
    expect(screen.getByRole("button", { name: /Enviar pré-cadastro/i }).hasAttribute("disabled")).toBe(true);
    expect(screen.queryByRole("heading", { name: /Seu próximo passo começa aqui/i })).toBeNull();
  });

  it("mantém o envio bloqueado com CPF inválido", () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "Ana Souza" } });
    fireEvent.change(screen.getByLabelText(/^CPF/i), { target: { value: "52998224724" } });
    fireEvent.change(screen.getByLabelText(/Comprovante de endereço/i), { target: { files: [new File(["x"], "conta.pdf", { type: "application/pdf" })] } });
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button", { name: /Enviar pré-cadastro/i }).hasAttribute("disabled")).toBe(true);
  });

  it("mantém o envio bloqueado com nome incompleto", () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/^CPF/i), { target: { value: "52998224725" } });
    fireEvent.change(screen.getByLabelText(/Comprovante de endereço/i), { target: { files: [new File(["x"], "conta.pdf", { type: "application/pdf" })] } });
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button", { name: /Enviar pré-cadastro/i }).hasAttribute("disabled")).toBe(true);
  });

  it("mantém o envio bloqueado sem comprovante de endereço", () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "Ana Souza" } });
    fireEvent.change(screen.getByLabelText(/^CPF/i), { target: { value: "52998224725" } });
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button", { name: /Enviar pré-cadastro/i }).hasAttribute("disabled")).toBe(true);
  });
});
