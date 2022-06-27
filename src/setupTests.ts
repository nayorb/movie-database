import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useSelector: (fn: () => any) => fn(),
  useDispatch: jest.fn(() => () => null),
}));
