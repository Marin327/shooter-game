import  { render, screen } from "@testing-library/react";
import Player from './Player';

test('render the player at the correct Position', () => {
    render(<Player position = {{ x:100, y:50 }}/>);
    const playerElement = screen.getByClass('player');
    expect(playerElement).toHaveStyles('left: 100px, bottom: 50px');
});