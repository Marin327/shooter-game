import { render, screen } from "@testing-library/react";
import Bullet from "./Bullet";

test("renders the bullet at the correct position", () => {
    render(<Bullet position={{ x:150, y: 200}}/>);
    const bulletElement = screen.getByClassName('bullet');
    expect(bulletElement).tohaveStyle('left:150px, bottom: 200px');
});