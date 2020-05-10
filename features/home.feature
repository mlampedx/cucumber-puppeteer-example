Feature: Home Page
    Scenario Outline: Verify h1 - <domain>
        Given the <domain> domain and the <path> path
        Given a user on a <device> device
        Given a user in the <locale> locale
        Then the first header should be displayed
        And the text for the first header should be "<h1>"

        Examples:
            | domain | locale | device  | path | h1        |
            | test   | en-us  | desktop |      | Puppeteer |
            | test   | en-us  | tablet  |      | Puppeteer |
            | test   | en-us  | mobile  |      | Puppeteer |
