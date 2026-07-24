def calculate_split_share(bill_amount, tip_percentage, total_people):
    """
    This function takes the raw bill, tip percent, and number of people,
    and returns the total bill and the individual share.
    """
    # OPERATORS: * (multiplication), / (division), + (addition)
    tip_value = bill_amount * (tip_percentage / 100)
    grand_total = bill_amount + tip_value
    share_per_person = grand_total / total_people
    
    return grand_total, share_per_person

