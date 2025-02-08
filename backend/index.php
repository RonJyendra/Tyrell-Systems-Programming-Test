<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Function to generate a deck of 52 playing cards
function generateDeck() {
    $suits = ['S', 'H', 'D', 'C'];
    $values = [1 => 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10 => 'X', 11 => 'J', 12 => 'Q', 13 => 'K'];
    $deck = [];
    
    foreach ($suits as $suit) {
        foreach ($values as $key => $value) {
            $deck[] = "$suit-$value";
        }
    }
    return $deck;
}

// Get number of people from request
$input = json_decode(file_get_contents('php://input'), true);
$numPeople = isset($input['numPeople']) ? (int)$input['numPeople'] : null;

// Input validation
if ($numPeople === null || $numPeople < 0) {
    echo json_encode(["error" => "Input value does not exist or value is invalid"]);
    exit;
}

// Shuffle and distribute cards
$deck = generateDeck();
shuffle($deck);
$distribution = array_fill(0, $numPeople, []);

foreach ($deck as $index => $card) {
    $distribution[$index % $numPeople][] = $card;
}

// Format output
$output = [];
foreach ($distribution as $personCards) {
    $output[] = implode(",", $personCards);
}

echo json_encode(["distribution" => $output]);
