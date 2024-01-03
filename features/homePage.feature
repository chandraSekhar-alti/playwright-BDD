Feature: Login Feature
    Scenario: Login to OrangeHRM
        Given I navigate to the OrangeHRM login page
        Then I verify the OrangeHRM login page
        When I log in to OrangeHRM with username <uname> and password <upassword>
        Then I verify the Home page of OrangeHRM
        And I verify the side panel on the Home page

        Examples:
            | uname | upassword |
            | Admin | admin123  |