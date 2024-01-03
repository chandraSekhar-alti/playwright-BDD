Feature: Employee Management in in OrangeHRM PIM Module

    @timeout(180)
    Scenario: Validate the PIM page and create a new user in the OrangeHRM PIM Module
        Given I navigate to the OrangeHRM login page
        Then I verify the OrangeHRM login page
        When I log in to OrangeHRM with username <uname> and password <upassword>
        And I navigate to the PIM user creation page to create a new user
        And I land on the Employee List Details Tab to enter employee personal details
        And I search for the created employee in the PIM page
        Examples:
            | uname | upassword |
            | Admin | admin123  |

