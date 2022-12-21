// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface GameContractInterface {
    enum Status {
         WaitingForPlayers,
         WaitingForSecondPlayer,
         EnoughPlayers,
         FirstPlayerCommited,
         SecondPlayerCommited,
         FirstPlayerRevealed,
         SecondPlayerRevealed
    }

    enum Figure {
         None,
         Rock,
         Paper,
         Scissors
    }

    struct PlayersTurn {
         Figure figure;
         address playerAddress;
         bytes32 commitHash;
     }

     struct GameRound {
         PlayersTurn player1;
         PlayersTurn player2;
     }

     function joinPlayer() external;

     function commitMove(bytes32 hash) external;

     function revealMove(uint256 moveId, string memory salt) external;

     function calculateWiner() external;
}

contract Autoplayer {
    address private gameAddress;
    
    constructor (address _gameAddress) {
        gameAddress = _gameAddress;
    }

    function commitMove() external {
        bytes32 mixer = bytes32(bytes("kek"));
        bytes32 firstChoiceHash = keccak256(abi.encodePacked(msg.sender, GameContractInterface.Figure.Rock, mixer));
        GameContractInterface(gameAddress).joinPlayer();
        GameContractInterface(gameAddress).commitMove(firstChoiceHash);
    }
}
