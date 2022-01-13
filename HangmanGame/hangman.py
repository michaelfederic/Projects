"""
Create a hangman game
"""

import random
print("""
-----------------------------------------
|\t\tHangman:\t\t| 
|\tGuess the word or HANG!\t\t|
-----------------------------------------
""")

#create a dictionary with a list of topics and words

dict = {"fruits":
        ["apple"
        ,"pear",
        "orange",
        "grape",
        "watermelon",
        "banana"],
        "colors":
        ["red",
        "blue",
        "yellow",
        "green"
        ,"blue",
        "violet",
        "white"],
        "states":
        ["Connecticut",
        "Michigan",
        "Nevada",
        "Alabama",
        "Florida",
        "Kansas"],
        "names":[
        "michael",
        "jonathon",
        "william",
        "kyle",
        "henry"
        ]}

#create a list of body parts of stick figure man
hangman = ["      O      \n",
            "     /",
            "|",
            "\      \n",
            "     /",
            " \    "]


topics = ["fruits","colors","states","names"]

#assigns a random index from topics list
random_topic = topics[random.randrange(0,len(topics))]
#print(random_topic)

#assigns a random index from list of items within each topic
random_item = random.randrange(0,len(random_topic))
#print(random_item)

#assigns a word to display to the user to guess
word_to_guess = dict[random_topic][random_item]

#empty lists to capture wrong and guessed letters
wrong_guesses = []
guessed_already = []

#function that stores indeces of the letter guessed
def indeces(word,guess):
    indeces = []
    for i in range(len(word)):
        if guess == word[i]:
            indeces.append(i)
    return indeces

#function that checks if the word is solved
def check_completion(word,other_word):
    letters = []
    for i in word:
        letters.append(i)
        if letters == other_word:
            pass
    return letters

# main code
def update_game(word):
    count = 0
    str = ""
    print(f"\tThe topic is: {random_topic.capitalize()}!")
    print()
    print("-----------------------------------------")
    print()
    line = []
    word = word.lower()

    #create empty lines to show length of word
    for i in range(len(word)):
        line.append("_")
    
    while True:
        #print initial empty lines
        print(" ".join(line))
        
        #if the word is guessed end game
        if check_completion(word,line)==line:
            print("You shall live another day!")
            break

        #user input to guess a letter
        guess = input("Guess a letter: ").lower()

        #user input must be a letter
        if len(guess) >1 or guess.isdigit() or not guess.isalpha():
            print("You must guess a letter!")
            continue

        #variable that stores the indeces of the letter guessed
        indeces_ = indeces(word,guess)

        #handles already said letters
        if guess in guessed_already:
            print(f"You already guessed '{guess}'")
            continue

        #append the letter that was guessed into guessed_already list
        guessed_already.append(guess)

        #if the letter is in the word
        if guess in word:
            #loop for the indeces_ variable and change all indeces with guess
            for i in range(len(indeces_)):
                line[indeces_[i]] = guess
        else:
            #if the letter is not in the word append to wrong_guesses list
            wrong_guesses.append(guess)

            #handles when you reached the end of hangman drawing
            str+=f"{hangman[count]}"
            print(f"Wrong Guesses: {wrong_guesses}")
            if count ==4:
                print("This is your last guess!")
            elif count == 5:
                print("Maybe in the next life!")
                print(f"The word was: {word}")
                break
            print(str)

            #increment count by 1
            count+=1
            
    return ""

# def play_again():
#     pass
    

def main():
    update_game(word_to_guess)

if __name__ == "__main__":
    main()

