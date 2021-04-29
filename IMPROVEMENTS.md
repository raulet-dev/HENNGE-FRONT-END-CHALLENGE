# IMPROVEMENTS.md for HENNGE Front End Challenge
As your challenge description says:

**Suppose we have a system which archives emails of an organization. In the event of security incidents (such as leakage of sensitive information via emails), this system will be used by the organization's auditing department to retrieve and verify the emails of the concerning parties through its admin console. We would like you to design the user interface (UI) mockup for this system.**

I will base the improvements suggestions based on that premise, and try to improve the functionality based on the given data.
Based on the given premise and the structure of mails. I will improve the functionality of the app in the following way:

In order to help users to find more easily specific emails that they want I suggest to add a variety of search filters to narrow down email results as below:
- By email sender.
- By email receiver.
- By certain keywords at subject or topic.
- By mails with attachments.

I will do applying a secondary filter on the data after the date filter. (top.js line:11)

Select and save the search results for further use.
- Add checkbox buttons to the results to select the one we like to save
 - Add a check button with check (false/true) var or state at flatlist results. (mail-list.js line: 526 & 657)
- Add a save and load button to save the selected results in a new file
 -  Add save and load button with their functions (top.js line:50)
- Add new view to load and view saved files.
 - View called from load button after choose what file to load (after file exists check).